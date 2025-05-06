import React from "react";

const AnswerDeleteButton = ({ onClick }) => {
  return (
    <>
      <button onClick={onClick} className="btn p-1">
        <i
          className="bi bi-trash"
          style={{ fontSize: "1rem", color: "cornflowerblue" }}
        ></i>
      </button>
    </>
  );
};

export default AnswerDeleteButton;
