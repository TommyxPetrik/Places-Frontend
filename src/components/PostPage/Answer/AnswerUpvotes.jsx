import React from "react";

const AnswerUpvotes = ({ upvotes }) => {
  return (
    <>
      <div
        className="btn-upvotes p-2"
        style={{
          fontSize: "0.8rem",
          color: "cornflowerblue",
          backgroundColor: "rgb(15,15,15)",
          marginTop: "0.1rem",
        }}
      >
        {upvotes}
      </div>
    </>
  );
};

export default AnswerUpvotes;
