import React from 'react'
import { Helmet } from 'react-helmet'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import './layout.css'
import useSiteMetadata from './SiteMetadata'
import { withPrefix } from 'gatsby'

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata()
  return (
    <div>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="apple-touch-icon-precomposed" sizes="144x144" href={`${withPrefix('/')}img/favicon.png`} />
        <link rel="shortcut icon" href={`${withPrefix('/')}img/favicon.ico`} />
        {/* From favicomatic.com */}
        <link rel="apple-touch-icon-precomposed" sizes="57x57" href={`${withPrefix('/')}img/apple-touch-icon-57x57.png`} />
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href={`${withPrefix('/')}img/apple-touch-icon-114x114.png`} />
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href={`${withPrefix('/')}img/apple-touch-icon-72x72.png`} />
        <link rel="apple-touch-icon-precomposed" sizes="144x144" href={`${withPrefix('/')}img/apple-touch-icon-144x144.png`} />
        <link rel="apple-touch-icon-precomposed" sizes="60x60" href={`${withPrefix('/')}img/apple-touch-icon-60x60.png`} />
        <link rel="apple-touch-icon-precomposed" sizes="120x120" href={`${withPrefix('/')}img/apple-touch-icon-120x120.png`} />
        <link rel="apple-touch-icon-precomposed" sizes="76x76" href={`${withPrefix('/')}img/apple-touch-icon-76x76.png`} />
        <link rel="apple-touch-icon-precomposed" sizes="152x152" href={`${withPrefix('/')}img/apple-touch-icon-152x152.png`} />
        <link rel="icon" type="image/png" href={`${withPrefix('/')}img/favicon-196x196.png" sizes="196x196`} />
        <link rel="icon" type="image/png" href={`${withPrefix('/')}img/favicon-96x96.png" sizes="96x96`} />
        <link rel="icon" type="image/png" href={`${withPrefix('/')}img/favicon-32x32.png" sizes="32x32`} />
        <link rel="icon" type="image/png" href={`${withPrefix('/')}img/favicon-16x16.png" sizes="16x16`} />
        <link rel="icon" type="image/png" href={`${withPrefix('/')}img/favicon-128.png" sizes="128x128`} />
        <meta name="application-name" content="&nbsp;" />
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="msapplication-TileImage" content={`${withPrefix('/')}img/mstile-144x144.png`} />
        <meta name="msapplication-square70x70logo" content={`${withPrefix('/')}img/mstile-70x70.png`} />
        <meta name="msapplication-square150x150logo" content={`${withPrefix('/')}img/mstile-150x150.png`} />
        <meta name="msapplication-wide310x150logo" content={`${withPrefix('/')}img/mstile-310x150.png`} />
        <meta name="msapplication-square310x310logo" content={`${withPrefix('/')}img/mstile-310x310.png`} />
        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta
          property="og:image"
          content={`${withPrefix('/')}img/og-image.jpg`}
        />
      </Helmet>
      <Navbar />{children}
      <Footer />
    </div>
  )
}

export default TemplateWrapper
