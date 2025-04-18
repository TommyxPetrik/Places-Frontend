import React from "react";

const PostUpvotes = ({ upvotes }) => {
  return (
    <>
      <div
        className="btn-upvotes"
        style={{
          fontSize: "1rem",
          color: "cornflowerblue",
          paddingLeft: "0.5rem",
          paddingRight: "0.5rem",
        }}
      >
        {upvotes}
      </div>
    </>
  );
};

export default PostUpvotes;
