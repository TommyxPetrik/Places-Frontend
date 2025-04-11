import React from "react";
import PostOneTag from "./PostOneTag";

const PostTags = ({ tags }) => {
  return (
    <div className="d-flex gap-2 flex-wrap">
      {tags.map((tag, index) => (
        <PostOneTag key={index} tag={tag} />
      ))}
    </div>
  );
};

export default PostTags;
