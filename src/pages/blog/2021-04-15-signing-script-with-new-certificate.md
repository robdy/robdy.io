---
templateKey: blog-post
title: Signing script with new certificate
date: 2021-04-15T08:21:31.832Z
description: How to sign the scripts (or other files) in bulk while switching to
  the new certificate.
featuredpost: false
---
Intro

## Getting the certificate

## Signing scripts with the new certificate

```powershell
$signed = Get-ChildItem -filter *.ps1 -Recurse | Get-AuthenticodeSignature | Where-Object status -eq 'valid'
Set-AuthenticodeSignature -FilePath $signed.path -Certificate (Get-ChildItem Cert:\CurrentUser\Root -CodeSigningCert | Sort-Object notafter -Descending | Select-Object -First 1)
```

## Verifying the signature

To include:

TimeStampServer - for 
https://adamtheautomator.com/how-to-sign-powershell-script/
https://adamtheautomator.com/new-selfsignedcertificate/