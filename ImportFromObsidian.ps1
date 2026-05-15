<#
  .SYNOPSIS
  Pulls files from Obsidian and creates pull requests
  
  .DESCRIPTION
  Version: 0.1
  Pulls files from Obsidian and creates pull requests

  .NOTES
  Author: Robert Dyjas https://dyjas.cc

  .EXAMPLE
  .\ImportFromObsidian.ps1
#>

#region Variables
$repoLocalFolder = 'C:\Users\rober\OneDrive - Robert Dyjas\Dev\robdy.io'
$blogFolder = 'C:\Users\rober\OneDrive\Dokumenty\Obsidian\blog'
$blogImgFolder = Join-Path $repoLocalFolder 'src\img'
$imgFolder  = 'C:\Users\rober\OneDrive\Dokumenty\Obsidian\blog-img'
#endregion Variables

#region Processing
Set-Location $repoLocalFolder
git pull origin
git switch src

# Find new articles
$newPosts = Get-ChildItem -Path $blogFolder
foreach ($post in @($newPosts)) {
  <#
  $post = @($newPosts)[0]
  #>
  $postPath = ($post.name.split('.'))[0]
  git switch -c $postPath
  $postImgFolder = Join-Path $imgFolder $postPath
  if (-not (Test-Path $postImgFolder)) {
    Write-Error 'Image folder not found'
  }

  $postContent = Get-Content $post.FullName
  for ($i = 0; $i -lt $postContent.Count; $i++) {
    $line = $postContent[$i]
    $matches = $null
    if ($postContent[$i] -like "date:*") {
      $postContent[$i] = "date: $(Get-Date -AsUTC -Format o -Millisecond 0 -Second 0)"
    }

    if ($postContent[$i] -like "title:*") {
      $postTitle = $postContent[$i].Replace('title:','').Trim()
    }

    # Change images paths
    # from ![[IMG_4135.jpeg]] Image description
    # to   ![Using filter was 40 milliseconds faster](../../img/teams-users-by-policy/20231204-092236-ZcSUFOomLz.png)
    if ($postContent[$i] -match '!\[\[(.*)\]\]\s*(\w+)') {
      $postContent[$i] = "![$($matches.2)](../../img/$postPath/$($matches.1))"
    }
    
  }

  # TODO Change internal links

  $mdxPostNameWithDate = "$(@(Get-Date -Format 'yyyy-MM-dd'))-$($post.Name)x"
  $mdxPostPath = Join-Path -Path $repoLocalFolder -ChildPath 'blog' -AdditionalChildPath $mdxPostNameWithDate
  $postContent | Out-File $mdxPostPath
  Copy-Item $postImgFolder -Destination $blogImgFolder -Recurse

  # TODO Commit to repo
  git add . 
  $gitMessage = "Adds $postTitle"
  git commit -m $gitMessage
  git push origin
}
#endregion Processing