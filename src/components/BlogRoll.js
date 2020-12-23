import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import { kebabCase } from 'lodash'
import PreviewCompatibleImage from './PreviewCompatibleImage'

// class BlogRoll extends React.Component {
//   render() {
//     const { data } = this.props
//     const { edges: posts } = data.allMarkdownRemark

//     return (
//       <div className="columns is-multiline">
//         {posts &&
//           posts.map(({ node: post }) => (
//             <div className="is-parent column is-6" key={post.id}>
//               <article
//                 className={`blog-list-item tile is-child box notification ${post.frontmatter.featuredpost ? 'is-featured' : ''
//                   }`}
//               >
//                 <header>
//                   {post.frontmatter.featuredimage ? (
//                     <div className="featured-thumbnail">
//                       <PreviewCompatibleImage
//                         imageInfo={{
//                           image: post.frontmatter.featuredimage,
//                           alt: `featured image thumbnail for post ${post.frontmatter.title}`,
//                         }}
//                       />
//                     </div>
//                   ) : null}
//                   <p className="post-meta">
//                     <Link
//                       className="title has-text-primary is-size-4"
//                       to={post.fields.slug}
//                     >
//                       {post.frontmatter.title}
//                     </Link>
//                     <span> &bull; </span>
//                     <span className="subtitle is-size-5 is-block">
//                       {post.frontmatter.date}
//                     </span>
//                   </p>
//                 </header>
//                 <p>
//                   {post.frontmatter.description}
//                   <br />
//                   <br />
//                   <Link className="button" to={post.fields.slug}>
//                     Keep Reading →
//                   </Link>
//                 </p>
//               </article>
//             </div>
//           ))}
//       </div>
//     )
//   }
// }

class BlogRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div className="columns is-multiline">
        {posts &&
          posts.map(({ node: post }) => (
            <div>
              <Link
                className="roll-post-link"
                to={post.fields.slug}
              >
                <div className="roll-post-container" key={post.id}>
                  <article
                    className={`roll-list-item tile is-child box notification ${post.frontmatter.featuredpost ? 'is-featured' : ''
                      }`}
                  >
                    <header>
                      {/* {post.frontmatter.featuredimage ? (
                    <div className="featured-thumbnail">
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: post.frontmatter.featuredimage,
                          alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                        }}
                      />
                    </div>
                  ) : null} */}
                      <p className="roll-post-title">
                        {post.frontmatter.title}
                      </p>
                    </header>
                    {post.frontmatter.tags && post.frontmatter.tags.length ? (
                      <div>
                        <ul className="taglist">
                          {post.frontmatter.tags.map(tag => (
                            <li key={tag + `tag`}>
                              <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    <p>
                      {post.frontmatter.description}
                    </p>
                  </article>
                </div>
              </Link>
            </div>
          ))}
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
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
)
