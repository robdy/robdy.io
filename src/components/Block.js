import React from 'react'
import { FaInfoCircle } from '@react-icons/all-files/fa/FaInfoCircle'
import { FaExclamationTriangle } from '@react-icons/all-files/fa/FaExclamationTriangle'

const Block = (props) => {
  const typeIcon = {
    Note: <FaInfoCircle className="block-icon-Note" />,
    Warning: <FaExclamationTriangle className="block-icon-Warning" />,
  }

  return (
    <blockquote className={`block-${props.type}`}>
      <p className="block-title">
        {typeIcon[props.type]} {props.type}
      </p>
      <p {...props} />
    </blockquote>
  )
}

export const NoteBlock = (props) => <Block type="Note" {...props} />
export const WarningBlock = (props) => <Block type="Warning" {...props} />
