import React from 'react'
import { Link } from 'gatsby'
import { kebabCase } from 'lodash'

export default class PostTile extends React.Component {
  render() {
    const { postData } = this.props

    return (
      <div className="roll-tile-container">
        <Link className="roll-post-link" to={postData.fields.slug}>
          <div className="roll-post-container" key={postData.id}>
            <article
              className={`roll-list-item tile is-child box notification ${
                postData.frontmatter.featuredpost ? 'is-featured' : ''
              }`}
            >
              <header>
                {/* {postData.frontmatter.featuredimage ? (
                    <div className="featured-thumbnail">
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: postData.frontmatter.featuredimage,
                          alt: `featured image thumbnail for post ${postData.frontmatter.title}`,
                        }}
                      />
                    </div>
                  ) : null} */}
                <p className="roll-post-title">{postData.frontmatter.title}</p>
              </header>
              <p>{postData.frontmatter.description}</p>
              {postData.frontmatter.tags && postData.frontmatter.tags.length ? (
                <div>
                  <ul className="taglist">
                    {postData.frontmatter.tags.map((tag) => (
                      <Link to={`/tags/${kebabCase(tag)}/`}>
                        <li key={tag + `tag`}>{tag}</li>
                      </Link>
                    ))}
                  </ul>
                </div>
              ) : null}
            </article>
          </div>
        </Link>
      </div>
    )
  }
}
