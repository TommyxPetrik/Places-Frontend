import React from "react";
import Answer from "./Answer";
import { formatDistanceToNow } from "date-fns";
import { useState, useEffect } from "react";

const AnswerTree = ({ answer, userVotes, onAnswerCreated }) => {
  const [voteStatus, setVoteStatus] = useState(null);
  if (!answer) {
    console.warn("Answer is undefined!");
    return null;
  }

  useEffect(() => {
    if (!userVotes)
      return (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      );

    const upvotedAnswers = userVotes.answerVotes?.upvoted || [];
    const downvotedAnswers = userVotes.answerVotes?.downvoted || [];

    const status = upvotedAnswers.includes(answer._id)
      ? "upvoted"
      : downvotedAnswers.includes(answer._id)
      ? "downvoted"
      : null;

    setVoteStatus(status);
  }, [userVotes, answer._id]);

  return (
    <div className="mb-3 ms-3">
      <Answer
        key={answer._id}
        answerId={answer._id}
        voteStatus={voteStatus}
        username={answer.username}
        body={answer.body}
        time={
          answer.createdAt
            ? formatDistanceToNow(new Date(answer.createdAt), {
                addSuffix: true,
              })
            : "unknown time"
        }
        upvotes={answer.upvotes}
        onAnswerCreated={onAnswerCreated}
      />
      {answer.children && answer.children.length > 0 && (
        <div className="ms-4 border-start ps-3">
          {answer.children.map((child) => (
            <AnswerTree
              key={child._id}
              answer={child}
              onAnswerCreated={onAnswerCreated}
              userVotes={userVotes}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AnswerTree;
