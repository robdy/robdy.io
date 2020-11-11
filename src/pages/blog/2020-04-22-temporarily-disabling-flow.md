---
templateKey: blog-post
title: Temporarily disabling Flow
date: 2020-04-22T19:32:18.424Z
description: There are some cases in which you'd like to supress a flow in Power
  Automate for certain period of time. Be careful - turning it off doesn't
  always work as expected!
featuredpost: false
featuredimage: /img/coffee-gear.png
tags:
  - power automate
  - flow
---
I have created a flow for leave request system some time ago. Its purpose was to replace current 'system' which was based on one Excel file. The main functionality was the approval process, which triggered each time new item was added to the list.

After extensive testing, I was about to go live with it. However, to maintain the correct quota available to employees, I had to import all the existing requests first. The obvious idea was to turn off the flow, add items, and then turn it on.

Would you do the same if you were me?

If the answer is **yes**, you might be in trouble ;) that day I learnt that disabling flow doesn't make it not being triggered by the items added when it was turned off. It just makes it being triggered all at once when you turn the flow back on.

## Let's confirm it's still the case

As a test I created very basic flow:

![](/img/2020-11-11-21_19_43-window.png)

I added one item to confirm it's working. It was:

![](/img/2020-11-11-21_50_34-mail.png)

Once it arrived, I turned it off and then added 3 entries into the list. 5 mins later, I turned the flow on and then this happened:

![](/img/2020-11-11-21_55_08-mail.png)

> **NOTE**: it might be that if you wait more time, the flow won't be triggered. I'm currently testing it and I'll update the article with findings.

## How to handle it?

Simple condition should be enough:

![](/img/2020-11-11-22_05_13-edit-your-flow-_-power-automate.png)

You'll be able to determine *skipped* flows by their status:

![](/img/2020-11-11-22_11_00-mail.png)

Once you're done with importing, **you can safely delete it**.