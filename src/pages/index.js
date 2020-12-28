import React from 'react'
import Layout from '../components/Layout'
import BlogRoll from '../components/BlogRoll'

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div className="container">
          <h1>Welcome to my blog!</h1>
          <div className="bio flex">
            <div><img className="bio-picture" src='img/avatar-400.jpg' /></div>
            <div className="bio-text">
              Hi there!<br />
              My name is Robert. I'm more than happy to share some content with you via this blog.
              You might find content about PowerShell, Microsoft 365, as well as notes from my journey to learn Node.js.
            </div>
          </div>
        </div>
        <section className="section">
          <div className="container">
            <div className="content">
              <h1>Newest entries</h1>
              <BlogRoll />
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
