---
templateKey: blog-post
title: CsTeamsUpdateManagementPolicy cmdlets
date: 2020-11-25T18:21:32.839Z
description: New set of cmdlets has appeared in Skype for Business Online/Teams
  PowerShell. Cmdlets are Get/Set/New-CsTeamsUpdateManagementPolicy.
featuredpost: true
tags:
  - powershell
  - skype for business
  - teams
---
These three cmdlets are related with upcoming rollout of [Microsoft Teams Public Preview](https://docs.microsoft.com/en-us/MicrosoftTeams/public-preview-doc-updates).

There are three new cmdlets:
* Get-CsTeamsUpdateManagementPolicy
* Set-CsTeamsUpdateManagementPolicy
* New-CsTeamsUpdateManagementPolicy

## Default settings
``` json
Identity            : Global
Description         :
AllowManagedUpdates : False
AllowPreview        : False
UpdateDayOfWeek     : 1
UpdateTime          : 18:00
UpdateTimeOfDay     : 24/11/2020 18:00:00
```
## Available parameters

**AllowManagedUpdates** and **AllowPreview** accepts boolean values.

**UpdateDayOfWeek** accepts numbers from 0 to 6.

**UpdateTime** must be a valid HH:MM format string with leading 0. For instance 08:30.

**UpdateTimeOfDay** accepts `datetime` object (but you can supply string and it'll be converted, if possible).

It's currently unclear what the last parameter does, but whatever datetime you provide, it takes only the time (date is always set to today).