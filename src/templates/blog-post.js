import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import Comments from '../components/Comments'
import useSiteMetadata from '../components/SiteMetadata'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Navbar from '../components/Navbar'

const BlogPostTemplate = ({
  content,
  contentComponent,
  body,
  date,
  description,
  tags,
  title,
  helmet,
  relativePath,
}) => {
  const PostContent = contentComponent || Content
  const formattedDate = date.toLocaleDateString('en-us', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })
  const isoDate = date.toISOString()

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="header-container">
          <Navbar />
          <h1 className="post-title">{title}</h1>
          <p className="post-subheader">
            By{' '}
            <Link className="post-subheader-link" to="/about">
              Robert Dyjas
            </Link>
            {' on '}
            <time datetime={isoDate}>{formattedDate}</time>
            &nbsp;&bull;&nbsp;
            <a
              href={`https://github.com/robdy/robdy.io/edit/src/src/pages/${relativePath}`}
              className="post-subheader-link"
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              Edit this post
            </a>
          </p>
          {tags && tags.length ? (
            <div className="taglist-container">
              <ul className="taglist">
                {tags.map((tag) => (
                  <Link to={`/tags/${kebabCase(tag)}/`}>
                    <li key={tag + `tag`}>{tag}</li>
                  </Link>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
        <p className="description">{description}</p>
        <MDXRenderer>{body}</MDXRenderer>
        <Comments />
      </div>
    </section>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  date: PropTypes.instanceOf(Date),
  description: PropTypes.string,
  title: PropTypes.string,
  slug: PropTypes.string,
  helmet: PropTypes.object,
  relativePath: PropTypes.string,
  body: PropTypes.string,
}

const BlogPost = ({ data }) => {
  const { mdx: post } = data
  const { siteUrl } = useSiteMetadata()

  return (
    <Layout>
      <BlogPostTemplate
        content={post.body}
        contentComponent={HTMLContent}
        body={post.body}
        date={new Date(post.frontmatter.date)}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Robert Dyjas">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
            <meta
              property="og:description"
              content={`${post.frontmatter.description}`}
            />
            <meta property="og:title" content={`${post.frontmatter.title}`} />
            <meta property="og:url" content={`${siteUrl}${post.fields.slug}`} />
            <meta
              property="article:published_time"
              content={`${post.frontmatter.date}`}
            />
            <link rel="canonical" href={`${siteUrl}${post.fields.slug}`} />
          </Helmet>
        }
        relativePath={post.parent.relativePath}
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    mdx(id: { eq: $id }) {
      id
      parent {
        ... on File {
          relativePath
        }
      }
      fields {
        slug
      }
      body
      frontmatter {
        date
        title
        description
        tags
      }
    }
  }
`
