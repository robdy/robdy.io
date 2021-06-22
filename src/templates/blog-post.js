import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import Comments from "../components/Comments";
import useSiteMetadata from "../components/SiteMetadata";

const BlogPostTemplate = ({
  content,
  contentComponent,
  date,
  description,
  tags,
  title,
  helmet,
  relativePath,
}) => {
  const PostContent = contentComponent || Content;
  const units = {
    year: 24 * 60 * 60 * 1000 * 365,
    month: (24 * 60 * 60 * 1000 * 365) / 12,
    week: 24 * 60 * 60 * 1000 * 7,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000,
  };
  const currentTimeStamp = new Date().getTime();
  const elapsed = new Date(date) - currentTimeStamp;
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const relativeDate = (() => {
    for (let u in units) {
      if (Math.abs(elapsed) / units[u] >= 1) {
        return rtf.format(Math.round(elapsed / units[u]), u);
      }
    }
  })();

  return (
    <section className="section">
      {helmet || ""}
      <div className="container content">
        <div className="header-container">
          {tags && tags.length ? (
            <div className="taglist-container">
              <ul className="taglist">
                {tags.map((tag) => (
                  <li key={tag + `tag`}>
                    <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <h1 className="post-title">{title}</h1>
          <p className="post-subheader">
            By{" "}
            <Link className="post-subheader-link" to="/about">
              Robert Dyjas
            </Link>{" "}
            {relativeDate}
            &nbsp;&bull;&nbsp;
            <a
              href={`https://github.com/robdy/robdy.github.io/edit/src/src/pages/${relativePath}`}
              className="post-subheader-link"
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              Edit this post
            </a>
          </p>
        </div>
        <p className="description">{description}</p>
        <PostContent content={content} />
        <Comments />
      </div>
    </section>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  date: PropTypes.instanceOf(Date),
  description: PropTypes.string,
  title: PropTypes.string,
  slug: PropTypes.string,
  helmet: PropTypes.object,
  relativePath: PropTypes.string,
};

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;
  const { siteUrl } = useSiteMetadata();

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
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
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      parent {
        ... on File {
          relativePath
        }
      }
      fields {
        slug
      }
      html
      frontmatter {
        date
        title
        description
        tags
      }
    }
  }
`;
