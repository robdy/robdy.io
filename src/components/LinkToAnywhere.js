import React from "react";
import { Link } from "gatsby";
import useSiteMetadata from "./SiteMetadata";

export const LinkToAnywhere = (props) => {
  const { siteUrl } = useSiteMetadata();

  // Internal links
  if (
    // Handling links with hardcoded domain name
    (props.href.startsWith(siteUrl) && process.env.NODE_ENV === "production") ||
    props.href.startsWith("/") ||
    (props.href.startsWith("#") && props.children?.props?.mdxType !== "svg")
  ) {
    return (
      <Link to={props.href} aria-label={`${props.children} link`}>
        {props.children}
      </Link>
    );
  }

  console.log();
  // Paragraph links
  if (props.href.startsWith("#") && props.children?.props?.mdxType === "svg") {
    return (
      <Link
        className="anchor before"
        aria-label={props["aria-label"]}
        to={props.href}
      >
        {props.children}
      </Link>
    );
  }

  // External links
  return (
    <a href={props.href} rel="nofollow noopener noreferrer" target="_blank">
      {props.children}
    </a>
  );
};
