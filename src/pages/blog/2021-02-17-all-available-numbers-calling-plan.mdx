---
templateKey: blog-post
title: Get all available user numbers in Calling Plans
date: 2021-02-17T19:12:21.192Z
description: You can check how many numbers you have in your Teams Calling Plans.
  PowerShell cmdlet to use is Get-CsOnlineTelephoneNumber
featuredpost: false
tags:
  - powershell
  - teams
  - calling plan
---
> **NOTE**: The article below doesn't apply to numbers provided via Direct Routing

We'll use Teams PowerShell module. Connecting to Skype for Business Online is as usual:

```
$sfbSession = New-CsOnlineSession
Import-PSSession $sfbSession
```

> **NOTE**: If you still use Skype for Business Online module, remember that it's being decomissioned. I have [an article showing how to migrate to new module](/skype-connector-decomission/).

The cmdlet we'll be using is [`Get-CsOnlineTelephoneNumber`](https://docs.microsoft.com/en-us/powershell/module/skype/get-csonlinetelephonenumber?view=skype-ps):

```powershell
$allNumbers = Get-CsOnlineTelephoneNumber -IsNotAssigned -ResultSize 2147483647 -InventoryType Subscriber
```

Parameters we use:

* `-IsNotAssigned` - self explanatory
* `-ResultSize 2147483647` - there's no support for **Unlimited**, in contrary to other  Microsoft 365 cmdlets, so we specify maximum value (based on [the docs](https://docs.microsoft.com/en-us/powershell/module/skype/get-csonlinetelephonenumber?view=skype-ps#parameters))
* `-InventoryType Subscriber` - based on the docs, it's used to display numbers, which can be assigned to users.

Now we have our numbers saved into variable. We can process them, as we need. 

Few examples:

```powershell
# Group by city
$allNumbers | Group-Object CityCode -NoElement

# List all numbers
$allNumbers.Id

# Copy all numbers to clipboard
$allNumbers.Id | clip
```
