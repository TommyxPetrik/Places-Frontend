import React, { useState } from "react";
import AnswerUpvotes from "./AnswerUpvotes";
import AnswesUpvoteButton from "./AnswerUpvoteButton";
import AnswerDownvoteButton from "./AnswerDownvoteButton";
import AnswerReplyButton from "./AnswerReplyButton";
import AnswerShareButton from "./AnswerShareButton";
import CreateReply from "./CreateReply";
import { flushSync } from "react-dom";

const AnswerFooter = ({
  upvotes,
  onClick,
  answerId,
  onAnswerCreated,
  voteStatus,
}) => {
  const [reply, setReply] = useState(false);

  const handleUpvote = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/answers/upvote/${answerId}`,
        {
          method: "PUT",
        }
      );
      const updatedAnswer = await response.json();
      onPostUpdated(updatedAnswer);
    } catch (error) {
      console.error("Upvote error:", error.message);
    }
  };

  const handleDownvote = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/answers/downvote/${answerId}`,
        {
          method: "PUT",
        }
      );
      const updatedAnswer = await response.json();
      onPostUpdated(updatedAnswer);
    } catch (error) {
      console.error("Downvote error:", error.message);
    }
  };

  const replyToggle = () => {
    setReply((prev) => !prev);
  };

  return (
    <div className="card-footer bg-transparent border-0 p-0 mt-0">
      <div className="d-flex justify-content-between align-items-center mt-2">
        <div className="d-flex gap-2">
          <AnswerUpvotes upvotes={upvotes} />
          <AnswesUpvoteButton
            onClick={handleUpvote}
            isActive={voteStatus === "upvoted"}
          />
          <AnswerDownvoteButton
            onClick={handleDownvote}
            isActive={voteStatus === "downvoted"}
          />
          <AnswerReplyButton onClick={replyToggle} />
          <AnswerShareButton />
        </div>
      </div>
      {reply && (
        <CreateReply
          onCancel={() => setReply(false)}
          answerId={answerId}
          onAnswerCreated={onAnswerCreated}
        />
      )}
    </div>
  );
};

export default AnswerFooter;
