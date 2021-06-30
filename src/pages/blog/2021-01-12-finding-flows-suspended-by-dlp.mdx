---
templateKey: blog-post
title: Finding flows suspended by DLP
date: 2021-01-12T19:23:13.526Z
description: So you designed and implemented Data Loss Prevention policy in
  Power Automate. Now it's time to check if there was any impact on existing
  flows.
featuredpost: false
tags:
  - power automate
  - power platform
  - data loss prevention
  - flow
---
Let's start with installing proper modules. Check out [PowerShell Cmdlets for PowerApps and Flow creators and administrators](https://powerapps.microsoft.com/en-us/blog/gdpr-admin-powershell-cmdlets/) for all the details. For now what we need is:

```powershell
# Install admin module for current user only
Install-Module -Name Microsoft.PowerApps.Administration.PowerShell -Scope CurrentUser

# OR

# Install admin module for everyone
Install-Module -Name Microsoft.PowerApps.Administration.PowerShell
```

We're connecting with [`Add-PowerAppsAccount`](https://docs.microsoft.com/en-us/powershell/module/microsoft.powerapps.administration.powershell/add-powerappsaccount?view=pa-ps-latest).

> **NOTE**: Remember that admin cmdlets will only list data from the environments you have access to. Make sure to use the account with proper permission level.

For one-time check we don't have to care about unattended authentication so let's just run it with default options. We might need to respond to MFA challenge, depending on our account settings:

```powershell
Add-PowerAppsAccount
```
Let's get all the flows and save them to variable:
```powershell
$flows = Get-AdminFlow
```

By checking first non-empty element from the array, we can inspect the properties we have on each flow:

```powershell
$nonEmptyFlows = $flows | Where-Object {$_.FlowName}
$f = $nonEmptyFlows | Select-Object -First 1
$f

# Returns
FlowName         : xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
Enabled          : True
DisplayName      : Send a customized email when a new file is added
UserType         :
CreatedTime      : 2020-03-26T08:38:08.6649446Z
CreatedBy        : @{tenantId=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx; objectId=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx; us
                   erId=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx; userType=ActiveDirectory}
LastModifiedTime : 2020-03-26T08:42:32.4957819Z
EnvironmentName  : Default-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
Internal         : @{name=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx; id=/providers/Microsoft.ProcessSimple/environments/De
                   fault-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx/flows/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx; type=Micros
                   oft.ProcessSimple/environments/flows; properties=}
```

Notice that for the environments with no flows, we'll receive empty object. In my case first object from the array is empty:

```powershell
$flows[0]

# Returns
value
-----
{}
```

Ok, we now have all the flows, but do we only have `Enabled` property to check flow status? 🤔

We have more, but they are hidden a little bit. Let's check what is under `Internal`:

> **NOTE**: Remember to use `Format-List`. Otherwise, you might not see all the properties (same applies to `| Select-Object *`).

```powershell
PS> $f.internal | Format-List

# Returns
name       : xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
id         : /providers/Microsoft.ProcessSimple/environments/Default-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx/flows/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
type       : Microsoft.ProcessSimple/environments/flows
properties : @{apiId=/providers/Microsoft.PowerApps/apis/shared_logicflows; displayName=Send a customized email when a new file i
             s added; state=Started; sharingType=Coauthor; createdTime=2020-03-26T08:38:08.6649446Z; lastModifiedTime=2020-03-26T
             08:42:32.4957819Z; flowSuspensionReason=None; templateName=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx; environment=; definitio
             nSummary=; creator=; provisioningMethod=FromDefinition; flowFailureAlertSubscribed=True}
```

And under `Properties`
```powershell
PS> $f.internal.properties |Format-List


apiId                      : /providers/Microsoft.PowerApps/apis/shared_logicflows
displayName                : Send a customized email when a new file is added
state                      : Started
sharingType                : Coauthor
createdTime                : 2020-03-26T08:38:08.6649446Z
lastModifiedTime           : 2020-03-26T08:42:32.4957819Z
flowSuspensionReason       : None
templateName               : 827b37728b634ba89e3e6678ddff334e
environment                : @{name=Default-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx; type=Microsoft.ProcessSimple/environments; id=/
                             providers/Microsoft.ProcessSimple/environments/Default-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx}
definitionSummary          : @{triggers=System.Object[]; actions=System.Object[]; description=Send yourself or someone else a cus
                             tomized email whenever a new file is added to a selected SharePoint document library.}
creator                    : @{tenantId=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx; objectId=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx; user
                             Id=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx; userType=ActiveDirectory}
provisioningMethod         : FromDefinition
flowFailureAlertSubscribed : True
```

Ok, now we have two candidates: State and flowSuspensionReason. The latter seems more appropriate. However, it doesn't contain any useful value - I already checked that for you.

Let's check what are the values:

```powershell
PS> $nonEmptyFlows | Group {$_.internal.properties.state} -NoElement

Count Name
----- ----
   73 Started
   27 Stopped
    9 Suspended

PS> $nonEmptyFlows | Group {$_.internal.properties.flowSuspensionReason} -NoElement

Count Name
----- ----
  109 None
```

We'll be looking for flows with `State` = **Suspended**. Simple `Where-Object` will do:
```
$suspendedFlows = $nonEmptyFlows | Where-Object {$_.internal.properties.state -eq "Suspended"}
```

Now you have all the flows with their data saved into variable. Before reaching out to flow owners with the communication, make sure to read my previous article [Custom connectors with DLP policy in Power Automate](/custom-connectors-with-dlp-policy/). You'll learn about the behavior of DLP for custom connectors and what happens when you disable/rollback the policy.