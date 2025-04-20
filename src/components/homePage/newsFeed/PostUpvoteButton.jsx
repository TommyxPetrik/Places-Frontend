import React from "react";

const PostUpvoteButton = ({ onClick, isActive }) => {
  return (
    <>
      <button
        onClick={onClick}
        className={`btn btn-outline-secondary ${isActive ? "active" : ""}`}
      >
        <i
          className="bi bi-arrow-up"
          style={{ fontSize: "1rem", color: "cornflowerblue" }}
        ></i>
      </button>
    </>
  );
};

export default PostUpvoteButton;
