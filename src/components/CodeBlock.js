import React from 'react'

function CodeBlock(props) {
	const languageString = props.className.replace(/(language-| line-numbers)/mg, '');
	const shouldWrap = props.shouldWrap;
	const shouldWrapCallback = props.shouldWrapCallback;
	let modifiedProps = { ...props };

	if (shouldWrap) {
		let lineNumbers = modifiedProps.children.find((el) => el.props.className === 'line-numbers-rows');
		const lineNumbersStyle = { display: 'none', ...lineNumbers.props.style};
		const lineNumberComponent = {style: lineNumbersStyle, ...lineNumbers};
		const a = [modifiedProps.children[0], lineNumberComponent]
		modifiedProps = {children: a, ...modifiedProps};
		console.log(modifiedProps);

		modifiedProps.className = modifiedProps.className.replace(/ line-numbers/, '');

	}
	return (
		<React.Fragment>
			<section className='codeheader-section'>
				<div className='codeheader flex'>
					<span className='codeheader-language'>{languageString}</span>
					<button className='codeheader-button' onClick={() => {
						shouldWrapCallback(!shouldWrap)
						// const preBlocks = Array.from(document.querySelectorAll("pre[class*='language-']"));
						// if (preBlocks[0].classList.contains('line-numbers')) {
						// 	preBlocks.forEach((el) => el.classList.remove('line-numbers'));
						// 	document.querySelectorAll('span.line-numbers-rows').forEach((el) => {
						// 		el.style
						// 	})
						// } else {
						// 	preBlocks.forEach((el) => el.classList.add('line-numbers'));
						// }
					}}>Wrap</button>
				</div>
				<pre {...modifiedProps}>
					{props.children}
				</pre>
			</section>
		</React.Fragment>
	)
}

export default CodeBlock
