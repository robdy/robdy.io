import React from 'react'
import Layout from '../../components/Layout'
import BlogRoll from '../../components/BlogRoll'
import Navbar from '../../components/Navbar'
import rss from '../../img/rss-solid.svg'
import { Metadata } from '../../components/Metadata'
import useSiteMetadata from '../../components/SiteMetadata'

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div className="container">
          <Navbar />
          <div className="flex newest-posts-container">
            <h2 className="newest-posts-header">All posts</h2>
            <a href="/rss.xml" className="rss-link" rel="nofollow noopener noreferrer" target="_blank">
              <img src={rss} className="rss-icon" alt="RSS icon" />
            </a>
          </div>

        </div>
        <section className="section">
          <div className="container">
            <div className="content">
              <BlogRoll />
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

export const Head = ({ location: { pathname } }) => {
  const { title } = useSiteMetadata()
  const calculatedTitle = `All posts | ${title}`
  return (
    <Metadata pathname={pathname}>
      <title id="title">{calculatedTitle}</title>
      <meta id="og:title" property="og:title" content={calculatedTitle} />
    </Metadata>
  )
}