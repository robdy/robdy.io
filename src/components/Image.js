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
	const srcAbsolute = src.slice(6).toString()
	const relatedImage = data.allFile.nodes.find(node => node.absolutePath.includes(srcAbsolute) !== -1)

	console.log({ alt, src, srcAbsolute, data, relatedImage })
	return (<><p>{alt}</p>
		<GatsbyImage image={relatedImage.childImageSharp.gatsbyImageData} alt={alt} title={alt} />
		</>
	)
}