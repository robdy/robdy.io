---
templateKey: blog-post
title: Reducing Teams screenshare bandwidth
date: 2020-11-21T21:17:29.890Z
description: Since remote teaching started my mom was stuggling with sharing
  content via Teams.
featuredpost: false
tags:
  - teams
---
## Root cause diagnosis

The symptom was very simple - shared content got frozen every few minutes. The only remediation was to either change what's on the screen (e.g. by switching to another window) or simply restart sharing. It was also a bit difficult to spot - only if any of the students reported that, she knew something is wrong.

After some experiments we determined that the issue might be related to low connection stability. In conjunction with very low upload rate (lower than 1 Mbps) it probably caused some of the packets not arriving to their destination

## How to save bandwidth?

Although there's [one user voice entry asking to give users control over quality being shared](https://microsoftteams.uservoice.com/forums/555103-public/suggestions/35704984-allow-video-quality-settings-to-be-adjusted-downwa), it still has not too many votes (vote for it if you consider it important!) so it might take a while before it's implemented.

There's also an option to [limit bitrate via meeting policy](https://docs.microsoft.com/en-us/microsoftteams/meeting-policies-in-teams#media-bit-rate-kbs) but if you're the end user, you might probably not have access to it at all. If you have admin rights, you can easily adjust bitrate if needed. However, it's still a bit annoying if you need to wait for the policies to be applied (or delete cache to enforce it).

## How I addressed that?

After realizing that working with policies is not an option, I started thinking what can be done client-side, even though Teams client doesn't directly has such option. I tried to decrease screen resolution and the performance started to be much much better!

## Proof

Wireshark stats to be pasted
