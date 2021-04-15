---
templateKey: blog-post
title: Signing script with new certificate
date: 2021-04-15T08:21:31.832Z
description: Signing scripts with new certificate when the old one is expiring
featuredpost: false
---
```powershell
$signed = Get-ChildItem -filter *.ps1 -Recurse |Get-AuthenticodeSignature | where status -eq 'valid'
Set-AuthenticodeSignature -FilePath $signed.path -Certificate (Get-ChildItem Cert:\CurrentUser\Root -CodeSigningCert | Sort-Object notafter -Descending | Select-Object -First 1)

```