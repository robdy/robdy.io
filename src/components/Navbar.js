import React from 'react'
import { Link } from 'gatsby'
import server from '../img/server-icon.svg'
import thList from '../img/th-list-solid.svg'
import userTie from '../img/user-tie-solid.svg'

const Navbar = class extends React.Component {
  render() {
    return (
      <nav className="container navbar">
        <Link className="navbar-link" to="/">
          <div className="flex navbar-left">
            <img src={server} alt="Server icon" className="navbar-logo"></img>
            <div className="navbar-title">Robert Dyjas</div>
          </div>
        </Link>
        <ul className="navbar-links">
          <li className="navbar-item">
            <Link className="navbar-link" to="/all/">
              <img src={thList} alt="List icon" className="navbar-icon"></img> All posts
            </Link>
          </li>
          <li className="navbar-item">
            <Link className="navbar-link" to="/about/">
              <img src={userTie} alt="User icon" className="navbar-icon"></img>  About
            </Link>
          </li>
        </ul>
      </nav>
    )
  }
}


export default Navbar
