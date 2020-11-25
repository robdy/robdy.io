---
templateKey: 'blog-post'
title: 'Installing Outlook add-in for specific users'
date: 2017-08-10T10:11:12.000Z
featuredpost: false
description: >-
  Goal: to install Outlook add-in available only for specific users and to make it enable by default
tags:
  - powershell 
  - microsoft 365
  - exchange
---

> **NOTE**: I was using Office 365 so the cmdlets below should work in Exchange Online. For on-premises installations, you might need to get the user IDs in a different way.
>
> If you're using Office 365, you might want to have a look at [Centralized Deployment](https://docs.microsoft.com/en-us/office/dev/add-ins/publish/centralized-deployment).

Goal: to install Outlook add-in available only for specific users and to make it enable by default

### 1st attempt:

If you open Exchange admin center > organization > add-ins and try to add it from there:

![2017-08-10-16_24_04-add-ins-microsoft-exchange.png](/img/posts/2017-08-10-16_24_04-add-ins-microsoft-exchange.png)

you’ll not be able to set it provided only to specific user. You can only set its default state for enabled/disabled or make it available to nobody:

![2017-08-10-16_29_20-edit-add-in-settings.png](/img/posts/2017-08-10-16_29_20-edit-add-in-settings.png)

<!--more-->

### 2nd attempt:

This time using Windows PowerShell:
``` powershell	
New-App -Url "https://xxxxxxxx.azurewebsites.net/app-manifest-tst.xml" -OrganizationApp -UserList robert@domain.com,peter@domain.com -DefaultStateForUser Enabled
```
Surprisingly, this will install add-in enabled by default for all users.

### 3rd attempt:

This time I read the documentation more carefully and added this:
``` powershell	
-ProvidedTo SpecificUsers
```
Full command:
``` powershell
New-App -Url "https://xxxxxxxx.azurewebsites.net/app-manifest-tst.xml" -OrganizationApp -UserList robert@domain.com,piotr@domain.com -DefaultStateForUser Enabled -ProvidedTo SpecificUsers
```
This time it worked correctly.

To enabled add-in for another user you need to add him/her to UserList:
``` powershell	
$t = Get-App -OrganizationApp |Where-Object Displayname -eq "Add-in Name"
$t.UserList = $t.UserList + "marcin@domain.com"
$t | Set-App -UserList $t.UserList -OrganizationApp
```
For Exchange on-premises, get `DistinguishedName` another way (credits to @Kevin Moore):
```
$userToAdd = (Get-ADUser YourADAccountHere).DistinguishedName
$t.UserList = $t.UserList + $userToAdd
```
If you receive an error ‘There are multiple recipients matching the identity’ you can use the following code:
``` powershell	
for ($i=0; $i -lt ($t.UserList.Count); $i++) {
$t.UserList[$i] = (Get-Mailbox $t.UserList[$i] -RecipientTypeDetails UserMailbox).userprincipalname
```
