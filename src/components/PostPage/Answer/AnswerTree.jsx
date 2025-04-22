import React from "react";
import Answer from "./Answer";
import { formatDistanceToNow } from "date-fns";

const AnswerTree = ({ answer, voteStatus, onAnswerCreated }) => {
  if (!answer) {
    console.warn("Answer is undefined!");
    return null;
  }

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
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AnswerTree;
