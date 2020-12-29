---
templateKey: blog-post
title: Custom connectors with DLP policy
date: 2020-12-29T19:41:15.218Z
description: Custom connectors are not yet supported for Power Platform DLP
  policies. Let's check how they are processed.
featuredpost: false
tags:
  - power automate
  - power platform
  - data loss prevention
  - flow
---
## TL;DR

* Custom connectors inherit detault group specified in DLP policy
* Changes in policy don't reenable suspended flows, it has to be done manually
* Blocking custom connectors doesn't prevent the existing flows from running. It prevents it from being edited
* It doesn't matter whether the connector was added before or after DLP policies were configured
* It matters when the flows were created (before or after the policy was applied)

## Configuring custom environment

To not interrupt existing flows, we'll first create the environment. We'll then apply DLP policies to it.

Let's go to PowerPlatform Admin Center and click **New** under **Environments**:

![Power Plaftorm Admin Center environment tab](/img/20201229-212641-000006.png)

We'll choose to create **Production** environment, because why not:

![New environment settings](/img/20201229-212953-000007.png)

## Creating custom connector

We're going to create custom connector for testing. One will be created before any DLP policy is applied and another one after. We'll check if there's any difference.

Go to **PowerAutomate** from office.com menu:

![Microsoft 365 menu with Power Automate chosed](/img/20201229-112947-we2ugx3jnv.png)

From left menu choose **Data** => **Custom connectors**:

![Power Automate menu with custom connectors chosen](/img/20201229-113359-jgitdov5l3.png)

Create new custom connector from blank:

![Custom connector wizard with option to create from blank selected](/img/20201229-111634-tyzbnt4dmn.png)

If you recently deleted the connector and you're not using Premium license, you might be prompted to start a trial (see below). You can wait up to 5 mins and try again.

![Start your free trial popup](/img/2020-12-29-20_51_28.png)

We give it a name to distinguish when it was created:

![Choosing connector name wizard](/img/20201229-111652-wvriqjgpty.png)

You can use Swagger editor to create connector. Alternatively, **scroll down to go step-by-step**:

```yaml
swagger: '2.0'
info: {title: BeforeDLP, description: '', version: '1.0'}
host: httpbin.org
basePath: /
schemes: [https]
consumes: []
produces: []
paths:
  /: {}
  /get:
    get:
      responses:
        default:
          description: default
          schema: {}
      summary: Test
      operationId: '0'
      x-ms-visibility: important
      parameters: []
definitions: {}
parameters: {}
responses: {}
securityDefinitions: {}
security: []
tags: []
```

In **General** scroll down and enter any host. We can use [httpbin.org](https://httpbin.org) as it'll return real data without any configuration:

![Custom connector configuration window](/img/2020-12-29-20_57_34.png)

Under **Security** confirm no authentication being used:

![Security tab of custom connector configuration wizard](/img/20201229-112330-5a5mxiqmke.png)

Under **Definition** add new action and give it an operation ID:

![Definition tab of DLP configuration wizard](/img/20201229-112415-enrwnndxtc.png)

Before moving to test phase, notice that validation says *Path not defined*.

![Validation error under definition tab](/img/20201229-112437-gffq9iax9r.png)

To fix it, scroll up to **Request** and click **Import from sample**:

![Button to import from sample](/img/20201229-114003-ocjdti0ccj.png)

Choose `GET` verb and enter `get` URL:

![Importing request data from sample](/img/20201229-211203-000005.png)

Now you should be able to create the connector as prompted:

![Creating custom connector](/img/20201229-112455-m0kiyoglfl.png)

Once you see the message that the connector was successfully created, let's create a connection using it:

![Creating new connection for the connector](/img/20201229-114527-wfosqczfsd.png)

We don't need to test the connector in that case, but if you want, use **Test operation** button:

![Triggering connector test](/img/20201229-114543-j2cnzgaesq.png)

## Flows for testing

We need 4 flows to find out how the connectors are classfied:

* Using Office 365 Users connector (business, non-blockable)
* Using RSS connector, which will be classified as non-business
* Using Google Calendar connector, which will be blocked
* Using custom connector only

The first 3 connectors will be blocked if either one of the connectors is blocked or the connectors belong to two different groups (business/non-business). The last one will be blocked only if custom connector is classified as blocked.

I'm not covering the exact steps here. Any flow will do as long as it contains action from mentioned connectors **+ custom connector** we created before.

## Configuring DLP policies



## Results

If we set default group to **Blocked**, all the flows will stop working. However, the flow with only custom connector, won't show up as blocked on the list. The error will be visible if we want to edit the flow: IMAGE

What's interesting, we'll still be able to run flow in current state (it basically becomes non-editable): IMAGE