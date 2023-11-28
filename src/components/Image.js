import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { graphql, useStaticQuery } from 'gatsby'

export const Image = ({ alt, src }) => {
	const data = useStaticQuery(graphql`
		query ImageQuery {
			allFile {
				nodes {
					childImageSharp {
						gatsbyImageData
					}
					relativePath
					absolutePath
				}
				
			}
		}
	`)
	const relatedSrc = src.slice(6)
	const relatedImage = data.allFile.nodes.find(node => node.absolutePath.includes(relatedSrc))

	if (!relatedImage) return (<p style={{ color: 'red' }}>{alt} Image NOT FOUND</p>)

	return (
		<>
			<GatsbyImage image={relatedImage.childImageSharp.gatsbyImageData} alt={alt} title={alt} />
			<p className="image-title">{alt}</p>
		</>
	)
}