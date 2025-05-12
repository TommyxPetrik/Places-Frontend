import React from "react";

const PostOneTag = ({ tag }) => {
  return (
    <span className="badge text-bg-primary" style={{ marginRight: "0.3rem" }}>
      {tag}
    </span>
  );
};

export default PostOneTag;
