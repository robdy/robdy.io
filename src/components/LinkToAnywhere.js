import React from 'react'
import { Link } from 'gatsby'
import useSiteMetadata from './SiteMetadata'

export const LinkToAnywhere = (props) => {
  const { siteUrl } = useSiteMetadata()
  // Check paragraph links
  if (
    // Handling links with hardcoded domain name
    (props.href.startsWith(siteUrl) && process.env.NODE_ENV === 'production') ||
    props.href.startsWith('/')
  ) {
    return <Link to={props.href}>{props.children}</Link>
  }
  return <a {...props} />
}
