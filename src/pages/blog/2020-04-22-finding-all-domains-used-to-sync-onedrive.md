---
templateKey: blog-post
title: Finding all domains used to sync OneDrive
date: 2020-04-22T19:33:36.852Z
description: If you're going to restrict syncing OneDrive for Business libraries
  to specific domains only, you might want to first check, which domains are
  currently being used to synchronize data.
featuredpost: false
featuredimage: /img/coffee-gear.png
tags:
  - onedrive
  - office 365
---
This is most useful if your environment consist of many different domains and/or forests.

To get such data we'll be using audit log functionality in Microsoft 365 Compliance Center.

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

## Getting the data

If you want to get the data once, you can go to [audit log](https://compliance.microsoft.com/auditlogsearch) and search for **Allowed computer to sync files** event:

![](/img/2020-11-17-21_57_07-window.png)

From this level you you find machine's domain data by choosing **More information**:

![](/img/2020-11-17-21_59_33-window.png)

And finding **MachineDomainInfo** there:

![](/img/2020-11-17-22_03_27-window.png)

You can also export the results to `.csv` file