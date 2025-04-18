import React from "react";

const PostDownvoteButton = () => {
  return (
    <>
      <button className="btn btn-outline-secondary">
        <i
          className="bi bi-arrow-down"
          style={{ fontSize: "1rem", color: "cornflowerblue" }}
        ></i>
      </button>
    </>
  );
};

export default PostDownvoteButton;
