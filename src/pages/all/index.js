import React from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../../components/Layout'
import BlogRoll from '../../components/BlogRoll'
import Navbar from '../../components/Navbar'
import rss from '../../img/rss-solid.svg'

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <Helmet>
          <link rel="canonical" href="https://robdy.io/all/" />
        </Helmet>
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
