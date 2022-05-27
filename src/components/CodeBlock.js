import React, { useRef } from "react";

function CodeBlock(props) {
	const codeBlockRef = useRef(null);
	const isLineNumber = (el) => el.props.className === 'line-numbers-rows';
		
	const copyCode = () => {
		console.log(codeBlockRef)
		codeBlockRef.current.select();
		// navigator.clipboard.writeText('a')
	};

	const languageString = props.className.replace(/(language-| line-numbers)/mg, '');
	const shouldWrap = props.shouldWrap;
	const shouldWrapCallback = props.shouldWrapCallback;
	let modifiedProps = { ...props };

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
						shouldWrapCallback(!shouldWrap)
					}}>Wrap: {shouldWrap ? 'ON' : 'OFF'}</button>
					<button className='codeheader-button' onClick={copyCode}>Copy</button>
				</div>
				<pre {...modifiedProps} ref={codeBlockRef}	/>
			</section>
		</React.Fragment>
	)
}

export default CodeBlock
