import React from 'react'
import useSiteMetadata from './SiteMetadata'
import { withPrefix } from 'gatsby'

export const Metadata = ({ children, pathname}) => {
	const { title, description, siteUrl } = useSiteMetadata()
	const canonical = `${siteUrl}${pathname ? pathname : ''}`

	return (
		<React.Fragment>
			<html lang="en" />
			<title id="title">{title}</title>
			<meta id="description" name="description" content={description} />
			<link
				rel="apple-touch-icon-precomposed"
				sizes="144x144"
				href={`${siteUrl}${withPrefix('/')}img/favicon.png`}
			/>
			<link
				rel="shortcut icon"
				href={`${siteUrl}${withPrefix('/')}img/favicon.ico`}
			/>
			{/* From favicomatic.com */}
			<link
				rel="apple-touch-icon-precomposed"
				sizes="57x57"
				href={`${siteUrl}${withPrefix('/')}img/apple-touch-icon-57x57.png`}
			/>
			<link
				rel="apple-touch-icon-precomposed"
				sizes="114x114"
				href={`${siteUrl}${withPrefix('/')}img/apple-touch-icon-114x114.png`}
			/>
			<link
				rel="apple-touch-icon-precomposed"
				sizes="72x72"
				href={`${siteUrl}${withPrefix('/')}img/apple-touch-icon-72x72.png`}
			/>
			<link
				rel="apple-touch-icon-precomposed"
				sizes="144x144"
				href={`${siteUrl}${withPrefix('/')}img/apple-touch-icon-144x144.png`}
			/>
			<link
				rel="apple-touch-icon-precomposed"
				sizes="60x60"
				href={`${siteUrl}${withPrefix('/')}img/apple-touch-icon-60x60.png`}
			/>
			<link
				rel="apple-touch-icon-precomposed"
				sizes="120x120"
				href={`${siteUrl}${withPrefix('/')}img/apple-touch-icon-120x120.png`}
			/>
			<link
				rel="apple-touch-icon-precomposed"
				sizes="76x76"
				href={`${siteUrl}${withPrefix('/')}img/apple-touch-icon-76x76.png`}
			/>
			<link
				rel="apple-touch-icon-precomposed"
				sizes="152x152"
				href={`${siteUrl}${withPrefix('/')}img/apple-touch-icon-152x152.png`}
			/>
			<link
				rel="icon"
				type="image/png"
				href={`${siteUrl}${withPrefix(
					'/'
				)}img/favicon-196x196.png" sizes="196x196`}
			/>
			<link
				rel="icon"
				type="image/png"
				href={`${siteUrl}${withPrefix(
					'/'
				)}img/favicon-96x96.png" sizes="96x96`}
			/>
			<link
				rel="icon"
				type="image/png"
				href={`${siteUrl}${withPrefix(
					'/'
				)}img/favicon-32x32.png" sizes="32x32`}
			/>
			<link
				rel="icon"
				type="image/png"
				href={`${siteUrl}${withPrefix(
					'/'
				)}img/favicon-16x16.png" sizes="16x16`}
			/>
			<link
				rel="icon"
				type="image/png"
				href={`${siteUrl}${withPrefix(
					'/'
				)}img/favicon-128.png" sizes="128x128`}
			/>
			<meta name="application-name" content="&nbsp;" />
			<meta name="msapplication-TileColor" content="#FFFFFF" />
			<meta
				name="msapplication-TileImage"
				content={`${siteUrl}${withPrefix('/')}img/mstile-144x144.png`}
			/>
			<meta
				name="msapplication-square70x70logo"
				content={`${siteUrl}${withPrefix('/')}img/mstile-70x70.png`}
			/>
			<meta
				name="msapplication-square150x150logo"
				content={`${siteUrl}${withPrefix('/')}img/mstile-150x150.png`}
			/>
			<meta
				name="msapplication-wide310x150logo"
				content={`${siteUrl}${withPrefix('/')}img/mstile-310x150.png`}
			/>
			<meta
				name="msapplication-square310x310logo"
				content={`${siteUrl}${withPrefix('/')}img/mstile-310x310.png`}
			/>
			<meta name="theme-color" content="#fff" />

			<meta property="fb:app_id" content="1783959405089649" />
			<meta property="fb:admins" content="100000984883502" />

			<meta property="og:type" content="business.business" />
			<meta id="og:title" property="og:title" content={title} />
			<meta id="og:url" property="og:url" content={canonical} />
			<meta
				property="og:image"
				content={`${siteUrl}${withPrefix('/')}img/og-image.png`}
			/>
			<meta id="og:description" property="og:description" content={description} />
			<link id="canonical" rel="canonical" href={canonical} />
			<script
				async
				defer
				onload="this.setAttribute('data-domain',window.location.host)"
				src="https://plausible.io/js/plausible.js"
			></script>
			{children}
		</React.Fragment>
	)
}
