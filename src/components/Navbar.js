import React from 'react'
import { navigate } from 'gatsby-link'
import { Link } from 'gatsby'
import thList from '../img/th-list-solid.svg'
import home from '../img/home-solid.svg'

const Navbar = () => {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''
  console.log(currentUrl)
  return (
    <div className="container post-nav flex">
      <ul className="flex navbar-links">
        <li>
          {' '}
          <Link className="" to="/">
            <img src={home} alt="List icon" className="navbar-icon" /> Home
          </Link>
        </li>
        <li>
          {' '}
          <Link
            className={currentUrl.endsWith('all') ? 'disabled' : ''}
            to="/all"
          >
            <img src={thList} alt="List icon" className="navbar-icon" /> All
            posts
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
