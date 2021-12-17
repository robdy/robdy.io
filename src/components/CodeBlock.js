import React from 'react'

export const CodeBlock = (props) => {
	console.log(props.children)
	return (
    <pre className={props.className}>
      {props.children}
    </pre>
  )
}
