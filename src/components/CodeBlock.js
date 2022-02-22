import React from 'react'

function CodeBlock(props) {
	const languageString = props.className.replace(/(language-| line-numbers)/mg,'');
	return (
		<React.Fragment>
			<div className='codeHeader'>{languageString}</div>
			<pre {...props}>
				{props.children}
			</pre>
		</React.Fragment>
	)
}

export default CodeBlock
