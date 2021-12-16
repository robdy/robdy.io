import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import PostTile from '../components/PostTile'
import GuestPostTile from '../components/GuestPostTile'

class BlogRoll extends React.Component {
	render() {
		const { data } = this.props
		const { edges: localPosts } = data.allMdx
		const { edges: guestPosts } = data.allFeedAdamTheAutomator
		const posts = localPosts.concat(guestPosts)
		posts.sort(
			({ node: firstItem }, { node: secondItem }) =>
				new Date(
					secondItem?.frontmatter?.date || secondItem?.isoDate
				) -
				new Date(firstItem?.frontmatter?.date || firstItem?.isoDate)
		)

		return (
			<div className="columns is-multiline">
				{posts &&
					posts.map(({ node: post }) =>
						post?.fields?.slug ? (
							<PostTile postData={post} />
						) : (
							<GuestPostTile postData={post} />
						)
					)}
			</div>
		)
	}
}

BlogRoll.propTypes = {
	data: PropTypes.shape({
		allMdx: PropTypes.shape({
			edges: PropTypes.array,
		}),
	}),
}

export default () => (
	<StaticQuery
		query={graphql`
			query BlogRollQuery {
				allMdx(
					sort: { order: DESC, fields: [frontmatter___date] }
					filter: {
						frontmatter: { templateKey: { eq: "blog-post" } }
					}
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
		`}
		render={(data, count) => <BlogRoll data={data} count={count} />}
	/>
)
