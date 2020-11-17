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

To get such data we'll be using 

## Prerequisites

### Auditing turned on

If you're not sure if it's already turned on, go to [Audit page in M365 Compliance Center](https://compliance.microsoft.com/auditlogsearch) and check if you have the option to start recording activity:

![](/img/2020-11-17-21_25_11-.png)

If the button is available and the search is greyed out, you need to turn it on first.

### Exchange Online PowerShell module installed