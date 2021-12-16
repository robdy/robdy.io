import React from "react";

function ExternalLink(props) {
  return (
    <React.Fragment>
      <a href={props.href} target="_blank" rel="nofollow noopener noreferrer">
        {props.children}
      </a>
    </React.Fragment>
  );
}

export default ExternalLink;
