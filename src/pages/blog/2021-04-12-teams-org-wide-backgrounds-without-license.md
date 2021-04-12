---
templateKey: blog-post
title: Teams org-wide backgrounds without license
date: 2021-04-12T06:52:06.031Z
description: Org-wide backgrounds for Teams appeared in Microsoft 365 Roadmap.
  Here's how to get them today with no additional license.
featuredpost: false
tags:
  - teams
  - gpo
  - ""
---
> **NOTE**: The solution described above is not 100% the same as what Microsoft will be providing, as it only applied to domain-joined Windows devices.

Microsoft recently added [Microsoft Teams: Org wide backgrounds (Preview)](https://www.microsoft.com/en-us/microsoft-365/roadmap?&searchterms=80193&filters=&searchterms=80193) to their Roadmap (item 80193). The description says (emphasis mine):

> Organization-wide backgrounds will now be available in preview. **This feature will require an Advanced Communications license** when it becomes generally available.

We're finally getting an option to deploy custom Teams backgrounds to the entire organization. It is very handy idea, which might help people to celebrate and increase visibility of some special events within the organization.

Ok - have we can deploy it?

## Table of Contents
```toc
exclude: [Table of Contents]
```

## Prepare the backgrounds

For any of the options described below, you need to first prepare the backgrounds. Based on Tony Redmond's article [How to Use Background Images and Blurring in Microsoft Teams Meetings](https://office365itpros.com/2020/04/06/teams-meeting-background-image/) the requirements are:

> Microsoft’s recommendations are a minimum size of 360 x 360 pixels (this will not look good) and a maximum of 2048 x 2048 pixels. BMP, JPEG, and PNG formats are allowed.

Keep in mind the size of the images - if you want to deploy multiple heavy images, it might have impact on performance/network usage. PNGs are usually good choice

## Group Policy

First option is group policy! Knowing where all these custom backgrounds are uploaded in the machines, we can create a policy to put specific files in that folder.

First, create a folder on network share. Make sure that it's accessible to everyone (it should have at least *Read* permissions):

![Permissions on network folder](../../img/20210412-092312-fmay6h1it3.png "Permissions on network folder")

Now let's create group policy. As with all changes, **it's good to roll them out gradually**. We can use [Security Group Filters](https://docs.microsoft.com/en-us/windows/security/threat-protection/windows-firewall/assign-security-group-filters-to-the-gpo).

Our GPO will be applied to users, not to machines. We need to add our files under: *User Configuration => Preferences => Windows Settings => Files*.

We can either add files one-by-one (if we want very granular control):



Or with wildcard:



### Limitations

The solution comes with certain limitations:

* can only be applied to machines using GPO
* no mobile devices - custom backgrounds for them [are still in development](https://www.microsoft.com/en-us/microsoft-365/roadmap?searchterms=82234)
* 

## Final thoughts

Remember, that if you put backgrounds into the folder while Teams client is running, they'll appear next time you launch it.

When cleaning up, don't forget about `_thumb` file created by Teams - they won't be needed.
