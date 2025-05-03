import React from "react";

const PostDeleteButton = ({ onClick }) => {
  return (
    <>
      <button onClick={onClick} className="btn btn-outline-secondary">
        <i
          className="bi bi-trash"
          style={{ fontSize: "1rem", color: "cornflowerblue" }}
        ></i>
      </button>
    </>
  );
};

export default PostDeleteButton;
