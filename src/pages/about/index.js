import React from 'react'
import Layout from '../../components/Layout'
import ExternalLink from '../../components/ExternalLink'
import Navbar from '../../components/Navbar'
import { Metadata } from '../../components/Metadata'

const AboutPage = () => (
  <Layout>
    <div className="container">
      <Navbar />
      <h1>About me</h1>
      <p>
        My name is Robert Dyjas. I'm Microsoft Teams and Skype for Business
        specialist who also likes to learn{' '}
        <code class="language-text">$newThings</code> in the meantime.
      </p>
      <p>
        Current values of $newThings for me is{' '}
        <code class="language-text">[JavaScript, Web Development, CSS]</code>.
        It might be subject to change frequently.
      </p>
      <h2>Blog</h2>
      <p>
        On this blog I include some random hints/instructions about the issues I
        have resolved and decided to note so I don't have to search for the
        information once again. I'm glad if you find it somewhat useful!
      </p>
      <h2>Credits</h2>
      <ul>
        <li>
          Built and hosted by {' '}
          <ExternalLink href="https://netlify.com">Netlify</ExternalLink>
        </li>
        <li>
          Created using{' '}
          <ExternalLink href="https://gatsbyjs.org/">Gatsby</ExternalLink>
        </li>
        <li>
          Redesigned by{' '}
          <ExternalLink href="https://twitter.com/vponamariov">@vponamariov</ExternalLink>.{' '}
          Check{' '}
          <ExternalLink href="https://twitter.com/vponamariov/status/1404721299071639554">
            this tweet
          </ExternalLink>{' '}
          for details
        </li>
        <li>
          Logo icon made by{' '}
          <ExternalLink href="http://www.freepik.com/">Freepik</ExternalLink>{' '}
          from{' '}
          <ExternalLink href="https://www.flaticon.com/">Flaticon</ExternalLink>
        </li>
        <li>
          Navbar and footer icons from{' '}
          <ExternalLink href="https://fontawesome.com">
            FontAwesome
          </ExternalLink>{' '}
          (
          <ExternalLink href="https://fontawesome.com/license">
            see license details
          </ExternalLink>
          )
        </li>
      </ul>
    </div>
  </Layout>
)

export const Head = ({ location: { pathname } }) => (
  <Metadata pathname={pathname} />
)

export default AboutPage
