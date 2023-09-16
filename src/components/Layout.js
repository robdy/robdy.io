import React from 'react'
import Footer from '../components/Footer'
import './layout.css'
import { MDXProvider } from '@mdx-js/react'
import { NoteBlock, WarningBlock, TipBlock } from './Block'
import { LinkToAnywhere } from './LinkToAnywhere'
import { Header } from './Header'
import { CodeBlock } from './CodeBlock'

const TemplateWrapper = ({ children }) => {

  return (
    <div>
      <MDXProvider
        components={{
          Note: NoteBlock,
          Warning: WarningBlock,
          Tip: TipBlock,
          a: LinkToAnywhere,
          h1: props => <Header level={'1'} {...props} />,
          h2: props => <Header level={'2'} {...props} />,
          h3: props => <Header level={'3'} {...props} />,
          h4: props => <Header level={'4'} {...props} />,
          h5: props => <Header level={'5'} {...props} />,
          h6: props => <Header level={'6'} {...props} />,
          pre: CodeBlock,
        }}
      >
        {children}
      </MDXProvider>
      <Footer />
    </div>
  )
}

export default TemplateWrapper
