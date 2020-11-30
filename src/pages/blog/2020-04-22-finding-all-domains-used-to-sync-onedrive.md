---
templateKey: blog-post
title: Finding all domains used to sync OneDrive
date: 2020-11-30T20:33:00.000Z
description: If you're going to restrict syncing OneDrive for Business libraries
  to specific domains only, you might want to first check, which domains are
  currently being used to synchronize data.
featuredpost: false
featuredimage: /img/coffee-gear.png
tags:
  - onedrive
  - office 365
  - exchange online
  - audit log
---
This is most useful if your environment consist of many different domains and/or forests. To get such data we'll be using audit log functionality in Microsoft 365 Compliance Center.

## Table of Contents
```toc
# This code block gets replaced with the TOC
```

## Prerequisites

### Auditing turned on

If you're not sure if it's already turned on, go to [Audit page in M365 Compliance Center](https://compliance.microsoft.com/auditlogsearch) and check if you have the option to start recording activity:

![](/img/2020-11-17-21_25_11-.png)

If the button is available and the search is greyed out, you need to turn the audit log on first.

### Exchange Online PowerShell module installed

See [the article about Exchange Online module](https://docs.microsoft.com/en-us/powershell/exchange/exchange-online-powershell?view=exchange-ps) for more details about installation and connecting to your environment.

### Proper role

*View-Only Audit Logs* or *Audit Logs* role **in Exchange Online** is required ([source](https://docs.microsoft.com/en-us/microsoft-365/compliance/search-the-audit-log-in-security-and-compliance?view=o365-worldwide)).

If your account has *Global Admin* (in Microsoft 365) or *Organization Management* (in Exchange Online), that should be enough. In the environment, where access is limited, check if the role assigned to your account has the correct permission level.

In [legacy admin center](https://outlook.office365.com/ecp/):

![](/img/2020-11-17-21_42_55-.png)

Or [in the new one](https://admin.exchange.microsoft.com/#/adminRoles):

![](/img/2020-11-17-21_43_36-window.png)

## Getting data from GUI

If you want to get the data once, you can go to [audit log](https://compliance.microsoft.com/auditlogsearch) and search for **Allowed computer to sync files** event:

![](/img/2020-11-17-21_57_07-window.png)

From this level you you find machine's domain data by choosing **More information**:

![](/img/2020-11-17-21_59_33-window.png)

And finding **MachineDomainInfo** there:

![](/img/2020-11-17-22_03_27-window.png)

You can also export the results to `.csv` file. Unfortunately, it only exports basic details, without any option to include what we saw under **More information**.

## Getting data programatically

Using [Exchange Online PowerShell module](https://docs.microsoft.com/en-us/powershell/exchange/exchange-online-powershell?view=exchange-ps) you can get data on scheduled basis. You can also format your data in whatever way you prefer, so it seems pretty neat to explore that option.

Before we start, let's define some basic variables:

```powershell
# Paths
$userDataFilePath = Join-Path $logFolder 'SyncEvents.xlsx'

# Cloud service account
$cloudServiceAccount = 'ServiceAccount@tenant.onmicrosoft.com'
$cloudSvcAccCredsPath = Join-Path 'C:\Scripts\Src\' "$cloudServiceAccount-creds.xml"
$cloudSvcAccCreds = Import-Clixml $cloudSvcAccCredsPath

# Set logging level
$VerbosePreference = 'Continue'

# Set how long to check in the past
$checkUntil = (Get-Date).AddDays(-1)

# Initialize
$allToBeBlocked = @()
$end = (Get-Date)

# Domains to be excluded from the report
$domainGUIDArray = @(
  '11111111-aaaa-2222-3333-444444444444',
  'bbbbbbbb-bc25-4436-dddd-eeeeeeeeeeee'
  )
```

Then let's connect to Exchange Online and get some data:

```powershell
Connect-ExchangeOnline -Credential $cloudSvcAccCreds

while ($end -gt $checkUntil) {
  try {
    # Generate session ID
    $sessID = "OneDriveSyncCheck-$(Get-Random)"
    $start = $end.AddHours(-1)
    Write-Verbose "Checking entries to $end"  
    $res = $null
    $params = @{
      Operations = 'ManagedSyncClientAllowed'
      StartDate = $start
      EndDate = $end
      ResultSize = 5000
      SessionCommand = 'ReturnNextPreviewPage'
      SessionID = $sessID
      ErrorAction = 'Stop'
    }
    $res = Search-UnifiedAuditLog @params
    Write-Verbose "Found $($res.count) entries"
    $wouldBeBlocked = $res | Where-Object {
      ($_.AuditData | ConvertFrom-Json).MachineDomainInfo -notin $domainGUIDArray
    }
    $allToBeBlocked += $wouldBeBlocked | Sort-Object userids -unique | Select-Object -Property UserIds, @{n="UserAgent";e={($_.AuditData | ConvertFrom-Json).UserAgent}}, CreationDate
    $mostRecentEntry = $res.CreationDate | Sort-Object | Select-Object -First 1
    Write-Verbose "End date set to $mostRecentEntry"
    $end = $mostRecentEntry
  } catch {
    # In case any errors, always worth reconnecting
    Connect-ExchangeOnline -Credential $cloudSvcAccCreds
    Write-Error $_
  }
} # end of loop
```

## Code deep dive

```powershell
# Paths
$userDataFilePath = Join-Path $logFolder 'SyncEvents.xlsx'

# Cloud service account
$cloudServiceAccount = 'ServiceAccount@tenant.onmicrosoft.com'
$cloudSvcAccCredsPath = Join-Path 'C:\Scripts\Src\' "$cloudServiceAccount-creds.xml"
$cloudSvcAccCreds = Import-Clixml $cloudSvcAccCredsPath

# Set logging level
$VerbosePreference = 'Continue'
```
We only define basic variables here, nothing special. Next, let's define time range to be checked for events. Make sure to check **how long it takes to get all the data**, it might depend on your tenant size:

```powershell
# Set how long to check in the past
$checkUntil = (Get-Date).AddDays(-1)

# Initialize
$allToBeBlocked = @()
$end = (Get-Date)
```
Next, we can define an array of domains we'd like to exclude from the report. If you don't exclude anything, your list might be pretty big soon:
```powershell
# Domains to be excluded from the report
$domainGUIDArray = @(
  '11111111-aaaa-2222-3333-444444444444',
  'bbbbbbbb-bc25-4436-dddd-eeeeeeeeeeee'
  )
```
Then we need to connect to Exchange Online. Make sure that the sign-in method you use is suitable for unattended run. You can have a look at [App-only authentication](https://docs.microsoft.com/en-us/powershell/exchange/app-only-auth-powershell-v2?view=exchange-ps):
```powershell
Connect-ExchangeOnline -Credential $cloudSvcAccCreds
```
And now we start our processing. We want our loop to end once it reaches certain timestamp and we wrap all the processing in try catch block for error handling:
```powershell
while ($end -gt $checkUntil) {
  try {
```
Then we generate session ID to be used while sending all the requests. [See Parameters of `Search-UnifiedAuditLog`](https://docs.microsoft.com/en-us/powershell/module/exchange/search-unifiedauditlog?view=exchange-ps#parameters) for details.

For `SessionCommand` we set `ReturnNextPreviewPage` value, to get sorted data.

`ResultSize` is set to 5000, which is maximum value.

We also need to specify `ErrorAction = 'Stop'` so that we can use `try/catch` block.
```powershell
    # Generate session ID
    $sessID = "OneDriveSyncCheck-$(Get-Random)"
    $start = $end.AddHours(-1)
    Write-Verbose "Checking entries to $end"  
    $res = $null
    $params = @{
      Operations = 'ManagedSyncClientAllowed'
      StartDate = $start
      EndDate = $end
      ResultSize = 5000
      SessionCommand = 'ReturnNextPreviewPage'
      SessionID = $sessID
      ErrorAction = 'Stop'
    }
```
Then we use [splatting](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_splatting?view=powershell-7.1) to run our command.

If it runs successfully, we process the data to get desired format.

Once we get data processed, we check for most recent entry and then set it as new end date for next search.
```powershell
    $res = Search-UnifiedAuditLog @params
    Write-Verbose "Found $($res.count) entries"
    $wouldBeBlocked = $res | Where-Object {
      ($_.AuditData | ConvertFrom-Json).MachineDomainInfo -notin $domainGUIDArray
    }
    $allToBeBlocked += $wouldBeBlocked | Sort-Object userids -unique | Select-Object -Property UserIds, @{n="UserAgent";e={($_.AuditData | ConvertFrom-Json).UserAgent}}, CreationDate
    $mostRecentEntry = $res.CreationDate | Sort-Object | Select-Object -First 1
    Write-Verbose "End date set to $mostRecentEntry"
    $end = $mostRecentEntry
  } catch {
```
As most of the errors I saw were caused by disconnected session, let's try to reconnect. Worth noting - in case any error, new value for `$end` won't be set so the previous query will be executed:
```powershell
    # In case any errors, always worth reconnecting
    Connect-ExchangeOnline -Credential $cloudSvcAccCreds
    Write-Error $_
  }
} # end of loop
```