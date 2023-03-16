import React from 'react'
import Prism from 'prismjs'
const prismComponents = require(`prismjs/components`)

export const CodeBlock = (props) => {
	const codeProps = props.children.props;
	const blockLang = codeProps.className ? codeProps.className.replace(/^language-/g, '') : 'text'

	// Inspired by
	// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-remark-prismjs/src/load-prism-language.js
	const loadLangData = (lang) => {
		if (!lang) {
			// No language specified
			return
		}

		if (Prism.languages[lang]) {
			// Language already loaded
			return
		}
		const languageData = prismComponents.languages[lang]

		if (languageData.require) {
			// Load the required language first
			if (Array.isArray(languageData.require)) {
				languageData.require.forEach(loadLangData)
			} else {
				loadLangData(languageData.require)
			}
		}

		require(`prismjs/components/prism-${lang}.js`)
	}

	// Load language data first
	loadLangData(blockLang);

	// Highlight code
	const highlightedCode = Prism.highlight(codeProps.children, Prism.languages[blockLang], blockLang)

	return (
		<React.Fragment>
			<section class='codeheader-section'>
				<div class='codeheader flex'>
					<span class='codeheader-language'>{blockLang}</span>
					<button class='codeheader-button'>Wrap: OFF</button>
				</div>
			</section>
			<div className="gatsby-highlight" data-language={blockLang}>
				<pre className={`language-${blockLang}`}>
					<code className={`language-${blockLang}`} dangerouslySetInnerHTML={{ __html: highlightedCode }} />
				</pre>
			</div>
		</React.Fragment>
	)
}
