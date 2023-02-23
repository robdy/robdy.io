import React from 'react'
import { Link } from 'gatsby'
import { kebabCase } from 'lodash'

export default class PostTile extends React.Component {
  render() {
    const { postData } = this.props
    const postDate = new Date(postData.frontmatter.date)
    const postDateOptions = { year: 'numeric', month: 'long', day: 'numeric' }

    return (
      <div className="roll-tile-container">
        <div className="roll-post-container" key={postData.id}>
          <article
            className={`roll-list-item tile is-child box notification ${postData.frontmatter.featuredpost ? 'is-featured' : ''
              }`}
          >
            <Link className="roll-post-link" to={postData.fields.slug}>
              <header>
                {/* {postData.frontmatter.featuredimage ? (
                    <div className="featured-thumbnail">
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: postData.frontmatter.featuredimage,
                          alt: `featured image thumbnail for post ${postData.frontmatter.title}`,
                          />
                        }}
                    </div>
                  ) : null} */}
                <p className="roll-post-title">{postData.frontmatter.title}</p>
              </header>
            </Link>
            <Link className="roll-post-link" to={postData.fields.slug}>
              <p className={`roll-post-date`}>
                {postDate.toLocaleDateString('en-GB', postDateOptions)}
              </p>
            </Link>
            <Link className="roll-post-link" to={postData.fields.slug}>
              <p className={`roll-post-description`}>
                {postData.frontmatter.description}
              </p>
            </Link>
            {postData.frontmatter.tags && postData.frontmatter.tags.length ? (
              <div>
                <ul className="taglist" key={postData.id + `taglist`}>
                  {postData.frontmatter.tags.map((tag) => (
                    <Link to={`/tags/${kebabCase(tag)}/`} key={tag + `taglink`}>
                      <li key={tag + `tag`}>{tag}</li>
                    </Link>
                  ))}
                </ul>
              </div>
            ) : null}
          </article>
        </div>

      </div>
    )
  }
}
