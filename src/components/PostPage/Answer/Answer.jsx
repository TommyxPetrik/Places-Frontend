import React from "react";
import AnswerBody from "./AnswerBody";

const Answer = ({
  subplace,
  username,
  time,
  questiontitle,
  questionbody,
  tags,
  upvotes,
  onClick,
}) => {
  return (
    <>
      <div
        className="card card-hover"
        style={{
          minHeight: "11rem",
          maxHeight: "30rem",
          marginTop: "2rem",
          marginLeft: "2rem",
          paddingTop: "0rem",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          paddingBottom: "0rem",
          borderRadius: "1rem",
          backgroundColor: "#181c1f",
          color: "white",
        }}
      >
        <AnswerBody
          subplace={subplace}
          username={username}
          time={time}
          questiontitle={questiontitle}
          questionbody={questionbody}
          tags={tags}
          upvotes={upvotes}
          onClick={onClick}
        />
      </div>
    </>
  );
};

export default Answer;
