import React from 'react'
import { Link } from 'gatsby'
import server from '../img/server-icon.svg'
import thList from '../img/th-list-solid.svg'
import userTie from '../img/user-tie-solid.svg'



// const Navbar = class extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       active: false,
//       navBarActiveClass: '',
//     }
//   }

//   toggleHamburger = () => {
//     // toggle the active boolean in the state
//     this.setState(
//       {
//         active: !this.state.active,
//       },
//       // after state has been updated,
//       () => {
//         // set the class in state for the navbar accordingly
//         this.state.active
//           ? this.setState({
//             navBarActiveClass: 'is-active',
//           })
//           : this.setState({
//             navBarActiveClass: '',
//           })
//       }
//     )
//   }

//   render() {
//     return (
//       <nav
//         className="navbar is-transparent"
//         role="navigation"
//         aria-label="main-navigation"
//       >
//         <div className="container">
//           <div className="navbar-brand">
//             <Link to="/" className="navbar-item" title="blog-title">
//               <div class="header-title">
//                 robdy
//               </div>
//             </Link>
//             {/* Hamburger menu */}
//             <div
//               className={`navbar-burger burger ${this.state.navBarActiveClass}`}
//               data-target="navMenu"
//               onClick={() => this.toggleHamburger()}
//             >
//               <span />
//               <span />
//               <span />
//             </div>
//           </div>
//           <div
//             id="navMenu"
//             className={`navbar-menu ${this.state.navBarActiveClass}`}
//           >
//             <div className="navbar-start has-text-centered">
//               <Link className="navbar-item" to="/about">
//                 About
//               </Link>
//               <Link className="navbar-item" to="/all">
//                 All posts
//               </Link>
//             </div>
//           </div>
//         </div>
//       </nav>
//     )
//   }
// }

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
            <Link className="navbar-link" to="/all">
              <img src={thList} alt="List icon" className="navbar-icon"></img> All posts
            </Link>
          </li>
          <li className="navbar-item">
            <Link className="navbar-link" to="/about">
              <img src={userTie} alt="User icon" className="navbar-icon"></img>  About
            </Link>
          </li>
        </ul>
      </nav>
    )
  }
}


export default Navbar
