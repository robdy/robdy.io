import React, { useEffect, useRef, useState } from "react";

function CodeBlock(props) {
	const codeBlockRef = useRef(null);
	const [codeCopied, setCodeCopied] = useState(false);
	const isLineNumber = (el) => el.props.className === 'line-numbers-rows';


	useEffect(() => {
		// TODO Clean the code, add animation
		const timeoutId = setTimeout(() => {
			if (codeCopied) { setCodeCopied(false) }
		}, 2000);

		return () => clearTimeout(timeoutId);
	}, [codeCopied]);

	const copyCode = (e) => {
		if (!codeCopied) {
			navigator.clipboard.writeText(codeBlockRef.current.innerText)
				.then(setCodeCopied(true));
		}
		return;
	};

	const languageString = props.className.replace(/(language-| line-numbers)/mg, '');
	let { shouldWrap, shouldWrapCallback, ...modifiedProps } = props;

	if (shouldWrap) {
		// Hides span.line-numbers-rows
		const lineNumbers = modifiedProps.children.find(isLineNumber);
		let { props: lineNumbersProps } = lineNumbers;
		let { style: lineNumbersStyle } = lineNumbersProps;
		lineNumbersStyle = { display: 'none', ...lineNumbersStyle };
		lineNumbersProps = { ...lineNumbersProps, style: lineNumbersStyle };
		const modifiedChildren = modifiedProps.children.map((child) =>
			isLineNumber(child)
				? { ...lineNumbers, props: lineNumbersProps }
				: child
		)
		modifiedProps.children = modifiedChildren;

		// Removes left padding on the code
		modifiedProps.className = modifiedProps.className.replace(/ line-numbers/, '');
	}

	return (
		<React.Fragment>
			<section className='codeheader-section'>
				<div className='codeheader flex'>
					<span className='codeheader-language'>{languageString}</span>
					<button className='codeheader-button' onClick={() => {
						localStorage.setItem('codeShouldWrap', !shouldWrap);
						shouldWrapCallback(!shouldWrap)
					}}>Wrap: {shouldWrap ? 'ON' : 'OFF'}</button>
					<button className={`codeheader-button ${codeCopied ? 'codeheader-button-clicked' : null}`} onClick={copyCode}>{
						codeCopied ? 'Copied' : 'Copy'
					}</button>
				</div>
				<pre {...modifiedProps} ref={codeBlockRef} />
			</section>
		</React.Fragment>
	)
}

export default CodeBlock


