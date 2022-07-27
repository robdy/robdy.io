<#
  .SYNOPSIS
  Pulls Notion page and converts it to MDX
  
  .DESCRIPTION
  Version: 0.1
  Pulls Notion page and converts it to MDX

  .NOTES
  Author: Robert Dyjas https://dyjas.cc

  .EXAMPLE
  .\ConvertFromNotion.ps1 -PageId 'c7b03c7f5bfd460183e4a850d5168215'
#>
Param(
	[Parameter(Mandatory = $true,
		ValueFromPipeline = $true)]
	[string[]]
	$PageId
)

#region Variables
$imageRootFolderPath = './src/img'
$mdxFolderPath = './src/pages/blog'
$convertedTextArr = @()
$frontmatter = @()

$headers = @{}
$headers.Add("Accept", "application/json")
$headers.Add("Notion-Version", "2022-06-28")

$notionKey = $env:NOTION_KEY | ConvertTo-SecureString -AsPlainText -Force
#endregion Variables

#region Get page properties
$pageParams = @{
	Uri            = "https://api.notion.com/v1/pages/$PageId"
	Method         = 'GET'
	Headers        = $headers
	ContentType    = 'application/json'
	Authentication = 'Bearer'
	Token          = $notionKey
}
$pageRes = Invoke-RestMethod @pageParams
#endregion Get page properties

#region Get slug
$slugId = $pageRes.properties.Slug.id
$slugParams = @{
	Uri            = "https://api.notion.com/v1/pages/$PageId/properties/$slugId"
	Method         = 'GET'
	Headers        = $headers
	ContentType    = 'application/json'
	Authentication = 'Bearer'
	Token          = $notionKey
}
$slugRes = Invoke-RestMethod @slugParams
#endregion Get slug

#region Get title
$titleId = $pageRes.properties.Title.id
$titleParams = @{
	Uri            = "https://api.notion.com/v1/pages/$PageId/properties/$titleId"
	Method         = 'GET'
	Headers        = $headers
	ContentType    = 'application/json'
	Authentication = 'Bearer'
	Token          = $notionKey
}
$titleRes = Invoke-RestMethod @titleParams
#endregion Get title

#region Get tags
$tagsId = $pageRes.properties.tags.id
$tagsParams = @{
	Uri            = "https://api.notion.com/v1/pages/$PageId/properties/$tagsId"
	Method         = 'GET'
	Headers        = $headers
	ContentType    = 'application/json'
	Authentication = 'Bearer'
	Token          = $notionKey
}
$tagsRes = Invoke-RestMethod @tagsParams
#endregion Get tags

#region Get description
$descriptionId = $pageRes.properties.description.id
$descriptionParams = @{
	Uri            = "https://api.notion.com/v1/pages/$PageId/properties/$descriptionId"
	Method         = 'GET'
	Headers        = $headers
	ContentType    = 'application/json'
	Authentication = 'Bearer'
	Token          = $notionKey
}
$descriptionRes = Invoke-RestMethod @descriptionParams
#endregion Get description

#region Get blocks
$pageChildrenParams = @{
	Uri            = "https://api.notion.com/v1/blocks/$PageId/children"
	Method         = 'GET'
	Headers        = $headers
	ContentType    = 'application/json'
	Authentication = 'Bearer'
	Token          = $notionKey
}
$pageChildrenRes = Invoke-RestMethod @pageChildrenParams
#endregion Get blocks

#region Calculated variables
$mdxFilePrefix = Get-Date $pageRes.last_edited_time -Format 'yyyy-MM-dd'
$pageSlug = $slugRes.results[0].rich_text.plain_text
$mdxFileName = "$mdxFilePrefix-$pageSlug.mdx"
#endegion Calculated variables

#region Processing content
[object[]]$blockArray = $pageChildrenRes.results
# TODO add numbered list
function ConvertFrom-RichText {
	param([parameter(Mandatory, ValueFromPipeline)]
		[object[]]$RichText)
	process {
		$blocks = $RichText.rich_text
		$mdTextArr = @()
		foreach ($block in $blocks) {
			<#
			$block = $blocks[0]
			#>
			$mdText = $block.text.content
			if ($block.annotations.bold) {$mdText = "**$mdText**"}
			if ($block.annotations.italic) { $mdText = "*$mdText*" }
			if ($block.annotations.code) { $mdText = "``$mdText``"}
			if ($block.text.link.url) { $mdText = "[$mdText]($($block.text.link.url))" }
			$mdTextArr += $mdText
		}
		return $mdTextArr -join ('')
	}
}
$imgSubFolderName = $pageSlug
$imageSubFolder = Join-Path $imageRootFolderPath $imgSubFolderName
foreach ($blockObj in $blockArray) {
	<#
	$blockObj = $blockArray[0]
	#>
	switch ($blockObj.Type) {
		"image" {
			if (-not (Test-Path $imageSubFolder)) {
				New-Item -Type Directory -Path $imageSubFolder | Out-Null
			}
			$caption = $blockObj.image.caption.plain_text
			$fileUrlNoParams = ($blockObj.image.file.url.split('?'))[0]
			$fileNameWithExt = ($fileUrlNoParams.split('/'))[-1]
			# TODO drop error when no caption specified
			
			# Check if the file already exists
			if (Test-Path (Join-Path $imageSubFolder $fileNameWithExt)) {
				# If already exists add -0 to the name, then -1 and so on
				$fileName = [System.IO.Path]::GetFileNameWithoutExtension($fileNameWithExt)
				$extension = [System.IO.Path]::GetExtension($fileNameWithExt)
				$i = 0
				do {
					$fileNameWithExt = "$fileName-$i$extension"
					$i++
				} until (-not (Test-Path (Join-Path $imageSubFolder $fileNameWithExt)))
			}
			Invoke-RestMethod -Method GET -Uri $blockObj.image.file.url -OutFile (Join-Path $imageSubFolder $fileNameWithExt)
			$convertedText = "![$caption](../../img/$imgSubFolderName/$fileNameWithExt)"
		}
		"heading_2" {
			$convertedText = "## $(ConvertFrom-RichText -RichText $blockObj.heading_2)"
		}
		"heading_3" {
			$convertedText = "### $(ConvertFrom-RichText -RichText $blockObj.heading_3)"
		}
		"code" {
			# Doesn't support code caption
			$convertedText = @"
``````$($blockObj.code.language)
$($blockObj.code.rich_text[0].plain_text)
``````
"@
		}
		"quote" {
			$convertedText = "> $(ConvertFrom-RichText -RichText $blockObj.quote)"
		}
		"bulleted_list_item" {
			$convertedText = "* $(ConvertFrom-RichText -RichText $blockObj.bulleted_list_item)"
		}
		"callout" {
			if ($blockObj.callout.icon.emoji -eq '💡') {
				$convertedText = "<Tip>`n`n$(ConvertFrom-RichText -RichText $blockObj.callout)`n`n</Tip>"
			}
		}
		"paragraph" {
			$convertedText = "$(ConvertFrom-RichText -RichText $blockObj.paragraph)"
		}
		Default { Write-Host -ForegroundColor Red $blockObj.type }
	}
	$shouldHaveNewLine = $true
	if ($convertedTextArr.Count -eq 0) { $shouldHaveNewLine = $false }
	if (
		# Previous line is list item
		$convertedTextArr[-1] -match "`n(1\.|\*) " -and
		# Current line is list item, too
		$convertedText -match "(1\.|\*) ") {
			$shouldHaveNewLine = $false
		}
	# Convert apostrophe to the correct code
	$convertedText = $convertedText.replace([char]8217, "'")
	$convertedTextArr += "$($shouldHaveNewLine ? "`n" : '')$convertedText"
}
#endregion Processing content

#region Processing frontmatter
$frontmatter += '---'
$frontmatter += 'templateKey: blog-post'
$frontmatter += "title: $($titleRes.results[0].title.plain_text)"
$frontmatter += "date: $(Get-Date $pageres.last_edited_time -Format "o")"
$frontmatter += "description: $($descriptionRes.results[0].rich_text.plain_text)"
$frontmatter += 'featuredpost: false'
$frontmatter += 'tags:'
foreach ($tag in $tagsRes.multi_select.name) {
	$frontmatter += "  - $tag"
}
$frontmatter += "---`n"

#region Processing frontmatter

#region Exporting
$frontmatter | Out-File -FilePath (Join-Path $mdxFolderPath $mdxFileName) 
$convertedTextArr | Out-File -FilePath (Join-Path $mdxFolderPath $mdxFileName) -Append
#endregion Exporting
