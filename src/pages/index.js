import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'gatsby'
import Layout from '../components/Layout'
import BlogRoll from '../components/BlogRoll'
import userTie from '../img/user-tie-solid.svg'

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <Helmet>
          {/* Fix it so it's not hardcoded */}
          <link rel="canonical" href="https://robdy.io" />
        </Helmet>

        <div className="bio">
          <div className="container flex">
            <div className="bio-picture-container flex">
              <img
                className="bio-picture"
                src="img/avatar-200.jpg"
                alt="Robert's profile"
                loading="lazy"
              />
            </div>
            <div className="bio-text">
              <p>Hi there! My name is Robert.</p>
              <p>
                I'm more than happy to share some content with you via this
                blog.{' '}
              </p>
              <p>
                You might find content about <strong>PowerShell</strong>,{` `}
                <strong>Microsoft 365</strong>, as well as notes from my journey
                to learn <strong>web development</strong>.
              </p>
              <ul className="bio-links flex">
                <li>
                  <Link to="/about/">
                    <img
                      src={userTie}
                      alt="User icon"
                      className="navbar-icon"
                    />{' '}
                    About me
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <section className="section">
          <div className="container">
            <div className="content">
              <h2 className="newest-posts-header">Newest entries</h2>
              <BlogRoll maxPosts={5} />
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
