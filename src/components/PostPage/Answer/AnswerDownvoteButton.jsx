import React from "react";

const AnswerDownvoteButton = ({ onClick, isActive }) => {
  return (
    <>
      <button
        onClick={onClick}
        className={`btn p-1 btnanswers ${isActive ? "active" : ""}`}
      >
        <i
          className="bi bi-arrow-down"
          style={{ fontSize: "0.8rem", color: "cornflowerblue" }}
        ></i>
      </button>
    </>
  );
};

export default AnswerDownvoteButton;
