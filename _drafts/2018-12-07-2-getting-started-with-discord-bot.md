---
published: true
layout: post
title: Getting started with Discord bot
categories: blog
---
If you want to write Discord bot, there are several options for getting started. I'll describe what I checked when I started looking at that.

### Creating webhook

For the first two attempts you'll have to create a webhook. Assume you have rights to create webhooks on your server, go to server settings:

![2019_01_30_20_48_18_pokecord.png]({{site.baseurl}}images/posts/2019_01_30_20_48_18_pokecord.png)

Then go to `Webhooks` and click `Create webhook button`:

![2019-01-30 20_50_14-pokecord.png]({{site.baseurl}}images/posts/2019-01-30 20_50_14-pokecord.png)

Enter name of your webhook (for your own use only so choose the descriptive one), choose the appropriate channel and save the link to clipboard. You'll use it later:

![2019-01-30 20_52_39-pokecord.png]({{site.baseurl}}images/posts/2019-01-30 20_52_39-pokecord.png)

**NOTE**: webhook is assigned to specific channel so if you want to post in multiple channels, you have to create one webhook per channel.
{:.message}

Now you can start implementing.

### No coding at all

My first attempt was based on [Mark Ramsey's article](https://medium.com/dolphin-squad/bringing-twitter-tweets-into-discord-channels-e8ded1581da8). If you happen to follow Tweets of specific user and post them to your Discord, read it and you're done. However, if you need to do anything else (i.e reposting top Reddit posts from specific sub, getting weather alerts etc.), follow this tutorial.

<!--more-->

Before you start, you have to create the webhook. [You can just follow the instruction here](https://support.discordapp.com/hc/en-us/articles/228383668-Intro-to-Webhooks)

First, go to [creating new applet page on IFTTT](https://ifttt.com/create). Choose the service:

![2018-12-07 12_06_08-Make an Applet - IFTTT.png]({{site.baseurl}}images/posts/2018-12-07 12_06_08-Make an Applet - IFTTT.png)

and specific action (I chose post upvote as it's easy to trigger for testing)

![2018-12-07 12_06_29-Make an Applet - IFTTT.png]({{site.baseurl}}images/posts/2018-12-07 12_06_29-Make an Applet - IFTTT.png)

Once you configured the trigger, go to action configuration:

![2018-12-07 12_07_16-Make an Applet - IFTTT.png]({{site.baseurl}}images/posts/2018-12-07 12_07_16-Make an Applet - IFTTT.png)

Your actions service will be `Webhooks`:

![2018-12-07 12_07_28-Make an Applet - IFTTT.png]({{site.baseurl}}images/posts/2018-12-07 12_07_28-Make an Applet - IFTTT.png)

In `URL` field you just have to paste your webhook URL. Do not forget to change method to `POST` (default is `GET`):

![2018-12-07 12_10_06-Make an Applet - IFTTT.png]({{site.baseurl}}images/posts/2018-12-07 12_10_06-Make an Applet - IFTTT.png)

`Content Type` should be `application/json` and in the body you enter the message you want to be sent.

![2018-12-07 12_21_29-Make an Applet - IFTTT.png]({{site.baseurl}}images/posts/2018-12-07 12_21_29-Make an Applet - IFTTT.png)

There are two options for formatting your message. The simpler one is to just fill username and content for example with this:
{% raw %}

```
{ "username":"New post", "content":"{{Title}} by {{Author}}" }
```
{% endraw %}
which would result in such message:

![2018-12-12 09_34_33-general.png]({{site.baseurl}}images/posts/2018-12-12 09_34_33-general.png)

You can use the dropdown `Add ingredient` to see which fields are available for you and to add them to your output:

![2018-12-07 12_23_39-Make an Applet - IFTTT.png]({{site.baseurl}}images/posts/2018-12-07 12_23_39-Make an Applet - IFTTT.png)


If you want, you can also create rich embed (you can take example from [here](https://birdie0.github.io/discord-webhooks-guide/discord_webhook.html) and adjust it to your needs). 

Once you're done with the configuration, click `Create action`, rename your applet if needed and click `Finish`:

![2018-12-07 12_24_29-Make an Applet - IFTTT.png]({{site.baseurl}}images/posts/2018-12-07 12_24_29-Make an Applet - IFTTT.png)

Now you just need to upvote something using your account. You might sometimes use `Check now` if the applet doesn't run ~~and you're impatient as me~~.

![2018-12-07 12_25_29-If New upvoted post by _u_robdy, then Make a web request - IFTTT.png]({{site.baseurl}}images/posts/2018-12-07 12_25_29-If New upvoted post by _u_robdy, then Make a web request - IFTTT.png)

### A little bit of coding

Another (more flexible) way would be to integrate web request into your code. Same as previously, you have to create the webhook.

Once your webhook is created, you need to send web requests from your code. How you do this, will depend on the language.

On that example, I use Node.js. If you don't have the environment installed, you can sign up to [repl.it](https://repl.it) and [create new Node.js project](https://repl.it/languages/nodejs). 

You code would look like this (example taken from [here](https://stackoverflow.com/a/12999483/9902555)):
``` javascript
var request = require('request');

request.post(
    'https://discordapp.com/api/webhooks/somethingsomething',
    { json: {
      username: 'Webhook',
      avatar_url: 'https://i.imgur.com/4M34hi2.png',
      content: 'Text message. Up to 2000 characters.'
    } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        }
    }
);
```
Later on, remember to [save your webhook url using `.env` file] (https://repl.it/site/docs/repls/secret-keys).

And if you prefer PowerShell, use the below:

``` powershell
$url = 'https://discordapp.com/api/webhooks/somethingsomething'

$body = @"
{
  "username": "Webhook",
  "avatar_url": "https://i.imgur.com/4M34hi2.png",
  "content": "Text message. Up to 2000 characters."
}
"@

Invoke-RestMethod -Method POST -Body $body -Uri $url
```

### More coding

[Example](https://anidiots.guide/getting-started/getting-started-long-version)

``` javascript
const Discord = require("discord.js");
const client = new Discord.Client();
const token = 'HereGoesSuperSecretToken';
 
client.on("ready", () => {
  console.log("I am ready!");
});
 
client.on("message", (message) => {
  if (message.content.startsWith("ping")) {
    message.channel.send("pong!");
  }
});
 
client.login(token);
```