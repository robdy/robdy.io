---
templateKey: blog-post
title: How to add RSS feed to GitHub README
date: 2021-04-02T15:08:25.063Z
description: I had an idea to add my newest blog posts to GitHub profile README,
  based on its RSS
featuredpost: false
tags:
  - github
  - readme
  - github actions
---
GitHub currently allows you to have your [profile README](https://docs.github.com/en/github/setting-up-and-managing-your-github-profile/managing-your-profile-readme).

When we create a repository with the same name as your GitHub username, its `README.md` will be displayed at the top of our profile. My blog is very important part of my online activity so I thought that it'd be a good idea to display some of my newest posts in there.

## Requirements

I had the following requirements:

* Must update itself so I don't need to edit it manually each time I post new entry
* Delay up to 24 hours is totally fine
* I need to be able to specify my own format for the list
* Should be free of charge

## Workflow

The workflow for that activity would be pretty straightforward:

1. Start script on scheduled basis
1. Checkout current state of the repository
1. Pull data from RSS
1. Insert data in predefined place in `README.md`
1. Push to GitHub

## Solution

My initial idea was to create PowerShell script, which would run on scheduled basis via [GitHub Actions](https://github.com/features/actions). 