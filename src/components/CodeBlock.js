import React, { useEffect } from 'react'
import Prism from 'prismjs'
// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-remark-prismjs/src/load-prism-language.js#LL2-L2C54
const prismComponents = require(`prismjs/components`)

export const CodeBlock = (props) => {
	const codeProps = props.children.props;
	const blockLang = codeProps.className ? codeProps.className.replace(/^language-/g, '') : 'markup'

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
		<div className="gatsby-highlight" data-language={blockLang}>
			<pre className={codeProps.className}>
				<code className={codeProps.className} dangerouslySetInnerHTML={{ __html: highlightedCode }} />
			</pre>
		</div>
	)
}


// https://github.com/PrismJS/prism/issues/972#issuecomment-374736957

// useEffect(() => {
// 	Prism.highlightAll();
// }, []);
// 	const wrappedHighlight = document.createElement('div');
// 	wrappedHighlight.className = 'language-powershell'
// 	wrappedHighlight.innerHTML = `
// 	<pre class="language-powershell"><code class="language-powershell">
// ${props.children.props.children}</code>
// </pre>
// 				`
// 	console.log(wrappedHighlight);

// 	Prism.highlightElement(wrappedHighlight)
// 	console.log(wrappedHighlight);
// 	console.log(wrappedHighlight.innerHTML)

// console.log(Prism.highlight(props.children.props.children, Prism.languages['powershell'], 'powershell' ))

{/* <div class="gatsby-highlight" data-language="powershell" dangerouslySetInnerHTML={{ __html: wrappedHighlight.innerHTML }}>
			</div> */}








// import React, { useEffect, useRef, useState } from "react";

// function CodeBlock(props) {
// 	// Code copy
// 	const codeBlockRef = useRef(null);
// 	const [codeCopied, setCodeCopied] = useState(false);

// 	useEffect(() => {
// 		const timeoutId = setTimeout(() => {
// 			if (codeCopied) { setCodeCopied(false) }
// 		}, 2000);

// 		return () => clearTimeout(timeoutId);
// 	}, [codeCopied]);

// 	const copyCode = (e) => {
// 		if (!codeCopied) {
// 			navigator.clipboard.writeText(codeBlockRef.current.innerText)
// 				.then(setCodeCopied(true));
// 		}
// 		return;
// 	};

// 	// End of Code copy

// 	// Language string to be use in the header
// 	const languageString = props.className.replace(/(language-| line-numbers)/mg, '');
// 	const codeProps = props.children.props;

// 	// Code wrapping
// 	let { shouldWrap, shouldWrapCallback, ...modifiedProps } = props;
// 	// To force pre rerender
// 	const [refresh, setRefresh] = useState(false);
// 	useEffect(()=> {
// 		setRefresh(!refresh);
// 	}, [shouldWrap])
// 	// End of Code wrapping

// 	return (
// 		<React.Fragment>
// 			<section className='codeheader-section'>
// 				<div className='codeheader flex'>
// 					<span className='codeheader-language'>{languageString}</span>
// 					<button className='codeheader-button' onClick={() => {
// 						localStorage.setItem('codeShouldWrap', !shouldWrap);
// 						shouldWrapCallback(!shouldWrap)
// 					}}>Wrap: {shouldWrap ? 'ON' : 'OFF'}</button>
// 					<button className={`codeheader-button ${codeCopied ? 'codeheader-button-clicked' : null}`} onClick={copyCode}>{
// 						codeCopied ? 'Copied' : 'Copy'
// 					}</button>
// 				</div>
// 			</section>
// 			{/* https://stackoverflow.com/a/48434525/9902555 
// 			https://www.freecodecamp.org/news/force-refreshing-a-react-child-component-the-easy-way-6cdbb9e6d99c/ */}
// 			<pre className={`${props.className}${shouldWrap ? '' : ' line-numbers'}`} ref={codeBlockRef} key={refresh}>
// 				<code {...props.children.props}></code>
// 				{shouldWrap ? null : <LineNumbers codeProps={codeProps} />}
// 			</pre>
// 		</React.Fragment>
// 	)
// }

// const LineNumbers = (props) => {
// 	// From gatsby-remark-prismjs
// 	// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-remark-prismjs/src/add-line-numbers.js

// 	const countLines = (lineObject) => (String(lineObject).match(/\n/g) || []).length;

// 	const numberOfLines = (codeElements) => {
// 		let lines = 1
// 		for (let i = 0; i < codeElements.children.length; i++) {
// 			typeof codeElements.children[i] === 'string'
// 				? lines += countLines(codeElements.children[i])
// 				: lines += countLines(codeElements.children[i].props.children);
// 		}
// 		return lines;
// 	}

// 	// Generate as many `<span></span>` as there are code lines
// 	const generateSpans = (numberOfLines) => {
// 		let spans = [];
// 		for (let i = 0; i < numberOfLines; i++) {
// 			spans.push(<span></span>)
// 		}
// 		return spans
// 	}

// 	return (
// 		<span aria-hidden="true" className="line-numbers-rows" style={{ 'white-space': 'normal', width: 'auto', left: 0 }}>
// 			{generateSpans(numberOfLines(props.codeProps))}
// 		</span>)
// }

// export default CodeBlock
