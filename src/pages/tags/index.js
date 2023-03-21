import React from 'react'
import { kebabCase } from 'lodash'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/Layout'
import Navbar from '../../components/Navbar'
import { Metadata } from '../../components/Metadata'

const TagsPage = ({
  data: {
    allMdx: { group },
  },
}) => (
  <Layout>
    <section className="section">
      <div className="container content">
        <Navbar />
        <div className="columns">
          <div
            className="column is-10 is-offset-1"
            style={{ marginBottom: '6rem' }}
          >
            <h1 className="title is-size-2 is-bold-light">Tags</h1>
            <ul className="taglist">
              {group.map((tag) => (
                <li key={tag.fieldValue}>
                  <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                    {tag.fieldValue} ({tag.totalCount})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)

export default TagsPage

export const Head = ({
  data: {
    site: {
      siteMetadata: { title },
    },
  },
  location: { pathname }
}) => (
  <Metadata pathname={pathname}>
    <title id="title">{`Tags | ${title}`}</title>
    <meta id="og:title" property="og:title" content={`Tags | ${title}`} />
    <meta name="robots" content="noindex" />
  </Metadata>
)

export const tagPageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    allMdx(limit: 1000) {
      group(field: {frontmatter: {tags: SELECT}}) {
        fieldValue
        totalCount
      }
    }
  }
`
