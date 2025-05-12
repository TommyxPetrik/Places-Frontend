import React from "react";
import AnswerBody from "./AnswerBody";

const Answer = ({
  body,
  answer,
  username,
  upvotes,
  onClick,
  time,
  answerId,
  onAnswerCreated,
  voteStatus,
  onRequireLogin,
  userId,
  onAnswerUpdated,
  edited,
  onRequestDelete,
  subplaceModerators,
}) => {
  return (
    <>
      <div
        className="card"
        style={{
          marginTop: "2rem",
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
          answerId={answerId}
          body={body}
          time={time}
          upvotes={upvotes}
          onClick={onClick}
          onAnswerCreated={onAnswerCreated}
          voteStatus={voteStatus}
          onRequireLogin={onRequireLogin}
          userId={answer.userid}
          onAnswerUpdated={onAnswerUpdated}
          edited={edited}
          onRequestDelete={onRequestDelete}
          subplaceModerators={subplaceModerators}
        />
      </div>
    </>
  );
};

export default Answer;
