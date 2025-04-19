import React from "react";

const AnswerUpvotes = ({ onClick }) => {
  return (
    <>
      <button onClick={onClick} className="btn p-1">
        <i
          className="bi bi-chat"
          style={{ fontSize: "0.8rem", color: "cornflowerblue" }}
        >
          {" "}
          Reply
        </i>
      </button>
    </>
  );
};

export default AnswerUpvotes;
