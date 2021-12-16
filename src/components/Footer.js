import React from 'react'
import home from '../img/home-solid.svg'
import stackOverflow from '../img/stack-overflow.svg'
import linkedin from '../img/linkedin.png'
import twitter from '../img/twitter.svg'
import github from '../img/github-icon.svg'

const Footer = class extends React.Component {
	render() {
		return (
			<footer className="footer">
				<div className="container flex footer-container">
					<div className="footer-text">
						Robert Dyjas © 2017-{new Date().getFullYear()}
					</div>
					<div className="footer-links">
						<a
							className="footer-link"
							href="https://dyjas.cc"
							target="_blank"
							rel="nofollow noopener noreferrer"
						>
							<img
								src={home}
								alt="Home icon"
								className="footer-icon"
							></img>
						</a>
						<a
							className="footer-link"
							href="https://stackoverflow.com/users/9902555/robdy?tab=profile"
							target="_blank"
							rel="nofollow noopener noreferrer"
						>
							<img
								src={stackOverflow}
								alt="Stack Overflow icon"
								className="footer-icon"
							></img>
						</a>
						<a
							className="footer-link"
							href="https://github.com/robdy"
							target="_blank"
							rel="nofollow noopener noreferrer"
						>
							<img
								src={github}
								alt="GitHub icon"
								className="footer-icon"
							></img>
						</a>
						<a
							className="footer-link"
							href="https://twitter.com/robdyy"
							target="_blank"
							rel="nofollow noopener noreferrer"
						>
							<img
								src={twitter}
								alt="Twitter icon"
								className="footer-icon"
							></img>
						</a>
						<a
							className="footer-link"
							href="https://linkedin.com/in/robertdyjas"
							target="_blank"
							rel="nofollow noopener noreferrer"
						>
							<img
								src={linkedin}
								alt="LinkedIn icon"
								className="footer-icon"
							></img>
						</a>
					</div>
				</div>
			</footer>
		)
	}
}

export default Footer
