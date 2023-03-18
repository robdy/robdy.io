import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Comments from '../components/Comments'
import useSiteMetadata from '../components/SiteMetadata'
import Navbar from '../components/Navbar'
import { Metadata } from '../components/Metadata'

const BlogPostTemplate = ({
  children,
  date,
  description,
  tags,
  title,
  relativePath,
}) => {
  const formattedDate = date.toLocaleDateString('en-us', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })
  const isoDate = date.toISOString()

  return (
    <section className="section">
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
        {children}
        <Comments />
      </div>
    </section>
  )
}

BlogPostTemplate.propTypes = {
  date: PropTypes.instanceOf(Date),
  description: PropTypes.string,
  title: PropTypes.string,
  slug: PropTypes.string,
  relativePath: PropTypes.string,
}

const BlogPost = (props) => {
  const { mdx: post } = props.data

  return (
    <Layout>
      <BlogPostTemplate
        children={props.children}
        date={new Date(post.frontmatter.date)}
        description={post.frontmatter.description}
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

export const Head = ({ data: { mdx: post } }) => {
  const { siteUrl } = useSiteMetadata()

  return (
    <Metadata>
      <title id="title">{`${post.frontmatter.title} | Robert Dyjas`}</title>
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
    </Metadata>
  )
}

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
      frontmatter {
        date
        title
        description
        tags
      }
    }
  }
`
