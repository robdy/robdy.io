---
templateKey: blog-post
title: Custom connectors with DLP policy in Power Automate
date: 2021-01-03T19:41:00.000Z
description: Custom connectors are not yet supported for Power Platform DLP
  policies. Let's check how they are processed and how we could secure them.
featuredpost: false
tags:
  - power automate
  - power platform
  - data loss prevention
  - flow
---
**[Click here to skip to findings](#conclusion)**

## Table of Contents

```toc
exclude: [Table of Contents]
```

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

In **General** section scroll down and enter any host. We can use [httpbin.org](https://httpbin.org) as it'll return real data without any configuration:

![Custom connector configuration window](/img/2020-12-29-20_57_34.png)

Under **Security** confirm no authentication being used:

![Security tab of custom connector configuration wizard](/img/20201229-112330-5a5mxiqmke.png)

Under **Definition** add new action and give it an operation ID:

![Definition tab of DLP configuration wizard](/img/20201229-112415-enrwnndxtc.png)

Before moving to test phase, notice that validation says *Path not defined*.

![Validation error under definition tab](/img/20201229-112437-gffq9iax9r.png)

To fix it, scroll up to **Request** and click **Import from sample**:

![Button to import from sample](/img/20201229-114003-ocjdti0ccj.png)

Choose `GET` verb and enter the service URL `https://httpbin.org/get`:

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

I'm not covering the exact steps here. For testing purposes any flow will work as long as it contains action from mentioned connectors **+ custom connector** we created before.

## Configuring DLP policies

In Power Platform Admin Center we choose [Data Policies](https://admin.powerplatform.microsoft.com/dlp) from the left menu. Under **New Policy** wizard we set the following classification:

* Business - Office 365 Users
* Blocked - Google Calendar
* Non-business - all others. Make sure that RSS is listed under that category

Setting default group might not be obvious to find at first glance. See the picture and set it as **Non-business** for now:

![Setting default group in DLP policy](/img/20201230-223745-000011.png)

Under *Scope* we choose **Add multiple environments**. In next step, we will be able to specify the list of environments to which the policy would be applied.

From the list we tick the check mark next to environment name and click **Add to policy**:

![Adding environment to DLP policy](/img/20201230-223113-000010.png)

We review the settings to make sure that we're not applying the policy to our default environment (it'd affect all the flows) and create it.

Now we have all set to do our tests.

## Test results

> **NOTE**: Please keep in mind that policies need some time to be fully applied. Sometimes they are applied with no delay. From time to time, flows might not be suspended immediately. Also note, that you must reenable the suspended flow - **they won't be enabled automatically** (confirmed 2 hours after disabling the policy).

After setting default group to *Non-business*, the following results appeared:

![Blocked and business flows are suspended](/img/20201230-152223-hwq8okdybb.png)

Blocked connector flow is suspended, which shouldn't be a surprise. Business connector flow is suspended too which means the custom connector was classified as non-business. Business and non-business connectors cannot share data between each other.

Then I temporarily excluded my environment from the policy, to make sure that all the policies are refreshed.

After setting default group to *Business* and applying the policy again, the following results appeared:

![Blocked and non-business flows are suspended](/img/20201230-180608-000008.png)

Flow with blocked connector is suspended again. Business connector flow is **not suspended** this time. It means that custom connector classification is business (again, classification of all connectors used in the same flow must match).

Now we should have pretty solid idea that *custom connectors are classified based on default group setting*. Let's confirm that with final test.

Last attempt is to apply the same policy, but specify default group to be *Blocked*:

Once we do that, all the flows should stop working. Here's what we see:

![All flows are suspended](/img/20201230-221900-000009.png)

🎉 We were right! 🎉 Based on all the tests, we now know that custom connectors will be classified based on default group settings in our DLP policy.

## Creating connectors under DLP policy

Let's see how our connectors behave when we have DLP policy applied to our environment. Using Swagger editor, we create new connector:

![Creating new connector via Swagger](/img/20201231-125544-uz6oaghwn6.png)

Even though our connector will be blocked by default, we don't receive any error while creating it. Let's now create the same flows as we had, but under DLP policy.

After we add action from our custom connector to the flow, it immediately returns the error:

![Custom connectors returning error](/img/20201231-130005-so3ab9nl2c.png)

In that case, there's no point creating the others, as it'd fail anyway.

## Conclusion

* Custom connectors inherit detault group specified in DLP policy
* Changes in policy don't reenable suspended flows, it has to be done manually
* Blocking custom connectors might happen after some delay
* It doesn't matter whether the connector was added before or after DLP policies were configured
* It matters when the flows were created (before or after the policy was applied)
* If DLP policy is applied to your environment and you block custom connectors, you won't be able to save the flow with it
