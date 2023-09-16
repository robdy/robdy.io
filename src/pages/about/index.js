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
        My name is Robert Dyjas. I'm Microsoft Teams and Microsoft 365 specialist who also likes to learn{' '}
        <code class="language-text">$newThings</code> in the meantime.
      </p>
      <p>
        Current values of $newThings for me is{' '}
        <code class="language-text">[JavaScript, Web Development, CSS]</code>.
        It might be subject to change frequently.
      </p>
      <p>
        Since the beginning of my career I'm working with Microsoft products. I'm mainly focused on communication tools: Teams, Skype for Business and Exchange.
      </p>

      <h2>Projects</h2>
      <p>
        I've been participating in various non-commercial projects in the past.
      </p>
      <h3>Microsoft 365 administration for Okręg Małopolski ZHR</h3>
      <p>
        I've been helping to implement new solutions based on Microsoft 365 for Polish non-profit organization.
      </p>
      <h3>Elekid bot</h3>
      <p>
        Discord bot written in Node.js.
      </p>
      <p>
        Features include:
        <ul>
          <li>Responding to user commands</li>
          <li>Setting nicknames on the server</li>
          <li>Pulling social media entries and sending to predefined channels</li>
          <li>Getting RSS entries from predefined URLs and sharing to predefined channels</li>
          <li>Data caching</li>
        </ul>
      </p>
      <p>
        <ExternalLink href="https://github.com/robdy/elekid-bot">
          GitHub repository
        </ExternalLink>
      </p>
      <p>
        <b>Technologies used</b>: Node.js, Discord.JS, Twitter API, PM2, Giphy API, Circle CI
      </p>

      <h3>FlairHQ</h3>
      <p>
        Web application to help moderating r/pokemontrades subreddit. I added new features (<ExternalLink href="https://github.com/pokemontrades/flairhq/pull/651">integration with Discord</ExternalLink>, <ExternalLink href="https://github.com/pokemontrades/flairhq/pull/625">new type of notifications</ExternalLink>, <ExternalLink href="https://github.com/pokemontrades/flairhq/pull/612">support for new games</ExternalLink>), fixed various bugs and added many small enhancements (
        <ExternalLink href="https://github.com/pokemontrades/flairhq/pull/629">#629</ExternalLink>,{' '}
        <ExternalLink href="https://github.com/pokemontrades/flairhq/pull/627">#627</ExternalLink>,{' '}
        <ExternalLink href="https://github.com/pokemontrades/flairhq/pull/597">#597</ExternalLink>,{' '}
        <ExternalLink href="https://github.com/pokemontrades/flairhq/pull/637">#637</ExternalLink>,{' '}
        <ExternalLink href="https://github.com/pokemontrades/flairhq/pull/631">#631</ExternalLink>,{' '}
        <ExternalLink href="https://github.com/pokemontrades/flairhq/pull/628">#628</ExternalLink>,{' '}
        <ExternalLink href="https://github.com/pokemontrades/flairhq/pull/645">#645</ExternalLink>) and <ExternalLink href="https://github.com/pokemontrades/flairhq/pull/599">added proper documentation</ExternalLink>.
      </p>
      <p>
        FlairHQ was my first real application involving Node.js.
      </p>
      <p>
        <ExternalLink href="https://github.com/pokemontrades/flairhq">GitHub repository</ExternalLink>
      </p>
      <p>
        <b>Technologies used</b>: Git, Node.js, Sails.JS, Reddit API, Discord.JS
      </p>
                                                                                            
      <h2>Blog</h2>
      <p>
        On this blog I include some random hints/instructions about the issues I
        have resolved and decided to note so I don't have to search for the
        information once again. I'm glad if you find it somewhat useful!
      </p>
      <h3>Credits</h3>
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
