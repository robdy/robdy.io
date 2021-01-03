import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout'
import BlogRoll from '../components/BlogRoll'
import userTie from '../img/user-tie-solid.svg'

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div className="container">
          <h1 className="page-header">Welcome to my blog!</h1>
          <div className="bio flex">
            <div><img className="bio-picture" src='img/avatar-200.jpg' alt="Robert's profile" loading="lazy" /></div>
            <div className="bio-text">
              Hi there!<br />
              My name is Robert. I'm more than happy to share some content with you via this blog.
              You might find content about PowerShell, Microsoft 365, as well as notes from my journey to learn Node.js.
              <ul className="bio-links flex">
                <li><Link to="/about"><img src={userTie} alt="User icon" className="navbar-icon" /> About me</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <section className="section">
          <div className="container">
            <div className="content">
              <h2>Newest entries</h2>
              <BlogRoll />
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
