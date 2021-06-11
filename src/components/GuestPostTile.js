import React from 'react'

export default class GuestPostTile extends React.Component {
  render() {
    const { postData } = this.props

    return (
      <div className="roll-tile-container">
        <a
          className="roll-post-link"
          href={postData.link}
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <div className="roll-post-container" key={postData.id}>
            <article
              className={`roll-list-item tile is-child box notification`}
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
                <p className="roll-post-title">{postData.title}</p>
              </header>
              <p className={`guest-post-note`}>
                Written for{' '}
                <a
                  href="https://adamtheautomator.com/author/robert-dyjas"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  AdamTheAutomator.com
                </a>
              </p>
              <p>{postData.contentSnippet}</p>
            </article>
          </div>
        </a>
      </div>
    )
  }
}
