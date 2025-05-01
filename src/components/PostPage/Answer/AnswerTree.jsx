import React from "react";
import Answer from "./Answer";
import { formatDistanceToNow } from "date-fns";
import { useState, useEffect } from "react";

const AnswerTree = ({ answer, userVotes, onAnswerCreated, onRequireLogin }) => {
  const [voteStatus, setVoteStatus] = useState(null);
  if (!answer) {
    console.warn("Answer is undefined!");
    return null;
  }

  useEffect(() => {
    if (!userVotes) return;
    const upvotedAnswers = userVotes?.upvoted || [];
    const downvotedAnswers = userVotes?.downvoted || [];

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
        onRequireLogin={onRequireLogin}
      />
      {answer.children && answer.children.length > 0 && (
        <div className="ms-4 border-start ps-3">
          {answer.children.map((child) => (
            <AnswerTree
              key={child._id}
              answer={child}
              onAnswerCreated={onAnswerCreated}
              userVotes={userVotes}
              onRequireLogin={onRequireLogin}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AnswerTree;
