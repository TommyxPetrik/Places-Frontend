import React from "react";

const AnswerUpvotes = ({ OnClick, isActive }) => {
  return (
    <>
      <button
        onClick={OnClick}
        className={`btn p-1 btnanswers ${isActive ? "active" : ""}`}
      >
        <i
          className="bi bi-arrow-up "
          style={{ fontSize: "0.8rem", color: "cornflowerblue" }}
        ></i>
      </button>
    </>
  );
};

export default AnswerUpvotes;
