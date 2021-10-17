import React from 'react'
import PostTile from '../components/PostTile'
import GuestPostTile from '../components/GuestPostTile'
import { usePostList } from './use-post-list'
import { Link } from 'gatsby'

function BlogRoll(props) {
  const data = usePostList()
  const { maxPosts } = props
  const { edges: localPosts } = data.allMdx
  const { edges: guestPosts } = data.allFeedAdamTheAutomator
  const posts = localPosts.concat(guestPosts)
  posts.sort(
    ({ node: firstItem }, { node: secondItem }) =>
      new Date(secondItem?.frontmatter?.date || secondItem?.isoDate) -
      new Date(firstItem?.frontmatter?.date || firstItem?.isoDate)
  )
  const postsToRender = maxPosts ? posts.slice(0, maxPosts) : posts

  return (
    <div className="columns is-multiline">
      {postsToRender &&
        postsToRender.map(({ node: post }) =>
          post?.fields?.slug ? (
            <PostTile postData={post} />
          ) : (
            <GuestPostTile postData={post} />
          )
        )}
      {maxPosts ? <Link to="/all">READ MORE</Link> : null}
    </div>
  )
}
export default BlogRoll
