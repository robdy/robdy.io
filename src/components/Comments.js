// Taken from https://dev.to/vincentntang/installing-gatsbyjs-blog-comments-using-utterances-1h8j

import React, { Component } from "react";
// import ThemeContext from '../context/ThemeContext';
export default class Comments extends Component {
  // static contextType = ThemeContext;

  constructor(props) {
    super(props);
    this.commentBox = React.createRef(); // Creates a reference to inject the <script> element
  }
  componentDidMount() {
    const theme = this.context;
    // const utteranceTheme = theme.dark ? "github-dark" : "github-light";
    let scriptEl = document.createElement("script");
    scriptEl.setAttribute("src", "https://utteranc.es/client.js");
    scriptEl.setAttribute("crossorigin", "anonymous");
    scriptEl.setAttribute("async", true);
    scriptEl.setAttribute("repo", "robdy/blog-comments");
    scriptEl.setAttribute("issue-term", "pathname");
    // scriptEl.setAttribute("theme", utteranceTheme);
    scriptEl.setAttribute("theme", "github-light");
    this.commentBox.current.appendChild(scriptEl);
  }

  render() {
    return (
      <div>
        <div ref={this.commentBox} className="comment-box" />
        {/* Above element is where the comments are injected */}
      </div>
    );
  }
}