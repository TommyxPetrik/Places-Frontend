import React from "react";

const PostUpvoteButton = () => {
  return (
    <>
      <button className="btn btn-outline-secondary">
        <i
          className="bi bi-arrow-up"
          style={{ fontSize: "1rem", color: "cornflowerblue" }}
        ></i>
      </button>
    </>
  );
};

export default PostUpvoteButton;
