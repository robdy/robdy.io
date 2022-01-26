[![Blog's image](static/img/og-image.png)](https://robdy.io)

## 👋 Welcome to my blog

You're now checking the repository for my blog. If you want to read the blog, visit [robdy.io](https://robdy.io).

## 📢 What content can you find here?

I'm writing about multiple technologies. Most of the content found here is about Microsoft 365, especially Teams. As I'm a 😻 big fan of automation 😻 you'll also find a lot of ⌨ PowerShell scripts. ⌨

My hobby is web development, so it's possible that some of the articles are my findings from learning process. I try to explain things as simple as possible and show step-by-step instructions.

## 📝 How can you contribute?

If you see any error/typo, feel free to open [an issue](https://github.com/robdy/robdy.io/issues/new/) or (even better) go to [blog folder](https://github.com/robdy/robdy.io/tree/src/src/pages/blog) and edit it. Then open a pull request so I can merge it.

## 🛠 What technologies were used to build the site?

Blog is built using [Gatsby](https://www.gatsbyjs.com/). I'm using [Netlify](https://netlify.com) to create build previews and deploy the website to [GitHub Pages](https://pages.github.com).

Content is being managed by [Netlify CMS](https://www.netlifycms.org/).

## 🏗️ Deploy configuration
The entire deployment process (including previews) is handled by Netlify.

## ✍ Article writing

### Adding Table of Contents

Requires [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one) in VS Code. The extension is already added to `devcontainer.json`.

In the article add: 

```markdown
<!-- omit in toc -->
## Table of Contents
```

The extension uses default settings:
- `toc.levels` not set - all levels of heading are included

Hit `Ctrl+Shift+P` and choose

![Adding table of contents in VS Code](static/img/adding-toc.png)

ToC settings can be found in [the extension page](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one#table-of-contents).