import React from "react";

const TagDescriptions = {
  datamining: (
    <div>
      <h2>Datamining</h2>
      <p>
        Datamining through PowerShell cmdlets provide the possibility to
        discover new exciting features long before they're released.
      </p>
      <p>
        You can get the script to discover new cmdlets and their parameters from
        the{" "}
        <a href="https://github.com/robdy/whats-new-m365">
          robdy/whats-new-m365 GitHub repository
        </a>
        .
      </p>
    </div>
  ),
};

const TagsData = (props) => {
  return TagDescriptions[props.tag] ? TagDescriptions[props.tag] : null;
};

export { TagsData };
