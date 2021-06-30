import React from 'react'
import Helmet from 'react-helmet'
import { kebabCase } from 'lodash'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import PostTile from '../components/PostTile'
import { TagsData } from '../components/TagsData'

class TagRoute extends React.Component {
  render() {
    const posts = this.props.data.allMdx.edges;
    const tag = this.props.pageContext.tag;
    const title = this.props.data.site.siteMetadata.title;
    const totalCount = this.props.data.allMdx.totalCount;
    const tagHeader = `${totalCount} post${
      totalCount === 1 ? "" : "s"
    } tagged with “${tag}”`;
    const tagPath = kebabCase(tag);
    const siteUrl = this.props.data.site.siteMetadata.siteUrl;

    return (
      <Layout>
        <section className="section">
          <Helmet title={`${tag} | ${title}`}>
            {/* <meta name="robots" content="noindex" /> */}
            <link rel="canonical" href={`${siteUrl}/tags/${tagPath}/`} />
          </Helmet>
          <div className="container content">
            <div
              className=""
            >
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
    );
  }
}

export default TagRoute;

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
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
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
`;
