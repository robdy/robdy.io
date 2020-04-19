import React from 'react'

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer has-background-black has-text-white-ter">
        <div className="content has-text-centered">
          robdy.github.io © {(new Date().getFullYear())}. <a href='/LICENSE.md'>MIT License.</a>
        </div>
      </footer>
    )
  }
}

export default Footer
