import React from 'react'

const Block = (props) => (
  <blockquote className={`block-${props.type}`}>
    <p>{props.type}</p>
    <p {...props} />
  </blockquote>
)

export const NoteBlock = (props) => <Block type="Note" {...props} />
export const ErrorBlock = (props) => <Block type="Error" {...props} />
