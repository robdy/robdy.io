import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import PostTile from '../components/PostTile'

class BlogRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    const { edges: guestPosts } = data.allFeedAdamTheAutomator.edges
    const localAndGuestPosts = posts.concat(guestPosts)
    localAndGuestPosts.sort(
      (firstItem, secondItem) =>
        new Date(
          secondItem.node?.frontmatter?.date || secondItem.node?.isoDate
        ) -
        new Date(firstItem.node?.frontmatter?.date || firstItem.node?.isoDate)
    )
    console.log(localAndGuestPosts)

    return (
      <div className="columns is-multiline">
        {localAndGuestPosts &&
          localAndGuestPosts.map(({ node: post }) =>
            post.fields.slug ? <PostTile postData={post} /> : null
          )}
      </div>
    )
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
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
        allFeedAdamTheAutomator {
          edges {
            node {
              link
              isoDate
              title
              id
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
)
