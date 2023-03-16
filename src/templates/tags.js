import React from 'react'
import { kebabCase } from 'lodash'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import PostTile from '../components/PostTile'
import { TagsData } from '../components/TagsData'
import Navbar from '../components/Navbar'

class TagRoute extends React.Component {
  render() {
    const posts = this.props.data.allMdx.edges
    const tag = this.props.pageContext.tag
    const totalCount = this.props.data.allMdx.totalCount
    const tagHeader = `${totalCount} post${totalCount === 1 ? '' : 's'
      } tagged with “${tag}”`
    const siteUrl = this.props.data.site.siteMetadata.siteUrl

    return (
      <Layout>
        <section className="section">
          <div className="container content">
            <Navbar />
            <div className="">
              <TagsData tag={this.props.pageContext.tag} />
              <h3 className="">{tagHeader}</h3>
              {posts &&
                posts.map(({ node: post }) => <PostTile postData={post} />)}
              <p>
                <Link to="/tags/">Browse all tags</Link>
              </p>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

export default TagRoute

export const Head = ({
  data: {
    site: {
      siteMetadata: { title, siteUrl },
    },
  },
  pageContext: {
    tag
  }
}) => {
  const tagPath = kebabCase(tag)

  return (
    <React.Fragment>
      <title>{`${tag} | ${title}`}</title>
      <meta name="robots" content="noindex" />
      <link rel="canonical" href={`${siteUrl}/tags/${tagPath}/`} />
    </React.Fragment>
  )
}

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        siteUrl
        title
      }
    }
    allMdx(
      limit: 1000
      sort: {frontmatter: {date: DESC}}
      filter: {frontmatter: {tags: {in: [$tag]}}}
    ) {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date
            title
            templateKey
            featuredpost
            description
            tags
          }
        }
      }
    }
  }
`
