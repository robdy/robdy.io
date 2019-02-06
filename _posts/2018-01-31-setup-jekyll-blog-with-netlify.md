---
published: true
layout: post
title: Setup Jekyll blog with Netlify
---
As I'm not (yet) very experienced with web developing this guide can be obvious. However, it's worth noted (at least for me) so I can check it if I have to go through the setup process again.

## How to setup Jekyll blog
I decided to try setting up blog using Jekyll. As a base of it I used [jekyll-now](https://github.com/barryclark/jekyll-now) repo.

### GitHub Pages
For running it on GitHub Pages it was pretty easy, as written in the documentation. Just fork, rename repo to yourusername.github.io, wait up to 10 mins and you're all set. ~~However, as GitHub Pages don't support (and as far as I know don't plan to) HTTPS for custom domains~~ I tried to use [Netlify](https://netlify.com) as another platform to host it. 

**Update 2018-05-01**: the above statement about GH Pages not supporting custom domains SSL is no longer valid as per [that announcement](https://blog.github.com/2018-05-01-github-pages-custom-domains-https/).

### Netlify
One of the services that supports HTTPS for custom domains is [Netlify](https://netlify.com). I quickly found [this instruction](https://www.netlify.com/blog/2015/10/28/a-step-by-step-guide-jekyll-3.0-on-netlify/).

However, it turned out it's not so easy as described in the article.

<!--more-->

First error I received was 

``` shell
/usr/local/bin/build: line 26: jekyll: command not found
```

What I had to do was to create a Gemfile with the following:

``` ruby
source "https://rubygems.org"
 gem 'jekyll', '3.7.2'
```

After creating Gemfile next error was:

``` shell
Deprecation: The 'gems' configuration option has been renamed to 'plugins'. Please update your config file accordingly.
```

Luckily the description here is self-explanatory. Next one was:

``` shell
jekyll 3.7.2 | Error: The jekyll-theme-minimal theme could not be found.
```

I received this because I chose the theme while setting up page on GitHub. I had to remove the line `theme: jekyll-theme-minimal` from `_config.yml` file.

Next one was not so easy:

``` shell
jekyll 3.7.2 | Error:  (/opt/build/repo/_config.yml): did not find expected key while parsing a block mapping at line 6 column 1
```

Fortunately, the line containing the error was pointed out. It contained `name: Rob Dy` what, for some reason, doesn't work on Netlify but works on GitHub. I tried to change it to `name: "Rob Dy"` and that helped.

Another error I got was:

``` shell
Dependency Error: Yikes! It looks like you don't have jekyll-sitemap or one of its dependencies installed. (...)
```

I had no idea how this can be resolved but found somewhere that Gemfile is the one to be changed in such cases. I added the lines to add all the gems/plugins I had in `_config.yml`:

``` ruby
gem 'jekyll-sitemap'
gem 'jekyll-feed'
```

That's it! After that I received `Site is live` and I was able to see the welcome page

![2018-01-31 22_32_33-Rob Dy – In-free-time developer.png]({{site.baseurl}}/images/posts/2018-01-31 22_32_33-Rob Dy – In-free-time developer.png)

Just one more thing - to also see drafts on the webpage I had to adjust the settings a bit:

![2018-01-31 22_34_53-Build & deploy _ Settings.png]({{site.baseurl}}/images/posts/2018-01-31 22_34_53-Build & deploy _ Settings.png)
