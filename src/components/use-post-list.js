import { useStaticQuery, graphql } from 'gatsby'
export const usePostList = () => {
  return useStaticQuery(
    graphql`
      query BlogRollQuery2 {
        allMdx(
          sort: {frontmatter: {date: DESC}}
          filter: {frontmatter: {templateKey: {eq: "blog-post"}}}
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
              contentSnippet
            }
          }
        }
      }
    `
  )
}
