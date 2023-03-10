import React from 'react'
import { Helmet } from 'react-helmet'
import Footer from '../components/Footer'
import './layout.css'
import useSiteMetadata from './SiteMetadata'
import { withPrefix } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { NoteBlock, WarningBlock, TipBlock } from './Block'
import { LinkToAnywhere } from './LinkToAnywhere'
import { Header } from './Header'
import CodeBlock from './CodeBlock'

const TemplateWrapper = ({ children }) => {
  const { title, description, siteUrl } = useSiteMetadata()

  return (
    <div>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
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
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta
          property="og:image"
          content={`${siteUrl}${withPrefix('/')}img/og-image.png`}
        />
        <meta property="og:description" content={description} />
        <script
          async
          defer
          data-domain="robdy.io"
          src="https://plausible.io/js/plausible.js"
        ></script>
      </Helmet>
      <MDXProvider
        components={{
          Note: NoteBlock,
          Warning: WarningBlock,
          Tip: TipBlock,
          a: LinkToAnywhere,
          h1: props => <Header level={'1'} {...props} />,
          h2: props => <Header level={'2'} {...props} />,
          h3: props => <Header level={'3'} {...props} />,
          h4: props => <Header level={'4'} {...props} />,
          h5: props => <Header level={'5'} {...props} />,
          h6: props => <Header level={'6'} {...props} />,
          pre: CodeBlock
        }}
      >
        {children}
      </MDXProvider>
      <Footer />
    </div>
  )
}

export default TemplateWrapper
