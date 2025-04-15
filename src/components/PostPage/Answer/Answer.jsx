import React from "react";
import AnswerBody from "./AnswerBody";

const Answer = ({ body, username, upvotes, onClick, time }) => {
  return (
    <>
      <div
        className="card"
        style={{
          marginTop: "2rem",
          marginLeft: "2rem",
          paddingTop: "0rem",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          paddingBottom: "0rem",
          backgroundColor: "rgb(15, 15, 15)",
          color: "white",
          border: "none",
        }}
      >
        <AnswerBody
          username={username}
          body={body}
          time={time}
          upvotes={upvotes}
          onClick={onClick}
        />
      </div>
    </>
  );
};

export default Answer;
