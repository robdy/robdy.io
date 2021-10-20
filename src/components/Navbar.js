import React from 'react'
import { navigate } from 'gatsby-link'

const Navbar = () => (
  <div className="container back-text">
    <p className="" onClick={() => navigate(-1)}>
      ← Back
    </p>
  </div>
)

export default Navbar
