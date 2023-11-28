import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { graphql, useStaticQuery } from 'gatsby'

export const Image = ({ alt, src }) => {
	// const data = useStaticQuery(graphql`
	// 	query ImageQuery {
	// 		file(relativePath: {eq: "Untitled-8.png"}) {
	// 			childImageSharp {
	// 				gatsbyImageData
	// 			}
	// 			relativePath
	// 		}
	// 	}
	// `)
	
	console.log({ alt, src})
	return <p>{alt}</p>
	// return <GatsbyImage image={data.file.childImageSharp.GatsbyImageData} />
}