import React from 'react'
import Prism from 'prismjs'
const prismComponents = require(`prismjs/components`)

export const CodeBlock = (props) => {
	const codeProps = props.children.props;
	const blockLang = codeProps.className ? codeProps.className.replace(/^language-/g, '') : 'markup'

	// Inspired by
	// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-remark-prismjs/src/load-prism-language.js

	// Get the real name of a language given it or an alias
	const getBaseLanguage = (nameOrAlias, components = prismComponents) => {
		if (components.languages[nameOrAlias]) {
			return nameOrAlias
		}
		return Object.keys(components.languages).find(language => {
			const { alias } = components.languages[language]
			if (!alias) return false
			if (Array.isArray(alias)) {
				return alias.includes(nameOrAlias)
			} else {
				return alias === nameOrAlias
			}
		})
	}

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
	const baseLang = getBaseLanguage(blockLang)

	if (!baseLang) {
		throw new Error(`Prism doesn't support language '${blockLang}'.`)
	}

	loadLangData(baseLang);

	// Highlight code
	const highlightedCode = Prism.highlight(codeProps.children, Prism.languages[blockLang], blockLang)

	// Line numbering WIP
	const highlightedCodeArray = highlightedCode.split(/\r?\n/g).slice(0, -1)
	const codeRows = highlightedCodeArray.map(el => {
		return `${el}`
	})
	const codeRowsStr = codeRows.join('\n')

	return (
		<React.Fragment>
			<section class='codeheader-section'>
				<div class='codeheader flex'>
					<span class='codeheader-language'>{blockLang}</span>
					{/* <button class='codeheader-button'>Wrap: OFF</button> */}
				</div>
			</section>
			<div className="gatsby-highlight" data-language={blockLang}>
				<pre className={`language-${blockLang} line-numbers`}>
					<LineNumbers codeProps={codeProps} />
					<code className={`language-${blockLang}`} dangerouslySetInnerHTML={{ __html: codeRowsStr }} />
				</pre>
			</div>
		</React.Fragment>
	)
}

const LineNumbers = ({ codeProps }) => {
	// From gatsby-remark-prismjs
	// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-remark-prismjs/src/add-line-numbers.js

	const countLines = (lineObject) => (String(lineObject).match(/\n/g) || []).length;

	const numberOfLines = (codeElements) => {
		let lines = 0
		for (let i = 0; i < codeElements.children.length; i++) {
			typeof codeElements.children[i] === 'string'
				? lines += countLines(codeElements.children[i])
				: lines += countLines(codeElements.children[i].props.children);
		}
		return lines;
	}

	// Generate as many `<span></span>` as there are code lines
	const generateSpans = (numberOfLines) => {
		let spans = [];
		for (let i = 0; i < numberOfLines; i++) {
			spans.push(<span className='line-numbers-cell'></span>)
		}
		return spans
	}

	return (
		<span aria-hidden="true" className="line-numbers-rows">
			{generateSpans(numberOfLines(codeProps))}
		</span>)
}
