import React from 'react'

function CodeBlock(props) {
	const languageString = props.className.replace(/(language-| line-numbers)/mg,'');
	return (
		<React.Fragment>
			<section className='codeheader-section'>
				<div className='codeheader flex'>
					<span className='codeheader-language'>{languageString}</span>
					<button className='codeheader-button'>Wrap</button>
					<button className='codeheader-button'>Copy</button>
				</div>
				<pre {...props}>
					{props.children}
				</pre>
			</section>
		</React.Fragment>
	)
}

export default CodeBlock
