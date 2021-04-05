import React from "react";
import Helmet from "react-helmet";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";
import PostTile from "../components/PostTile";

class TagRoute extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges;
    const tag = this.props.pageContext.tag;
    const title = this.props.data.site.siteMetadata.title;
    const totalCount = this.props.data.allMarkdownRemark.totalCount;
    const tagHeader = `${totalCount} post${
      totalCount === 1 ? "" : "s"
    } tagged with “${tag}”`;

    return (
      <Layout>
        <section className="section">
          <Helmet title={`${tag} | ${title}`}>
            <meta name="robots" content="noindex" />
          </Helmet>
          <div className="container content">
            <div className="">
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
        title
      }
    }
    allMarkdownRemark(
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
