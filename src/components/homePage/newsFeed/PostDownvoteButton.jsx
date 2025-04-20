import React from "react";

const PostDownvoteButton = ({ onClick, isActive }) => {
  return (
    <>
      <button
        onClick={onClick}
        className={`btn btn-outline-secondary ${isActive ? "active" : ""}`}
      >
        <i
          className="bi bi-arrow-down"
          style={{ fontSize: "1rem", color: "cornflowerblue" }}
        ></i>
      </button>
    </>
  );
};

export default PostDownvoteButton;
