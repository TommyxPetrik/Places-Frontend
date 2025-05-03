import React, { useState, useEffect } from "react";
import AnswerUpvotes from "./AnswerUpvotes";
import AnswerUpvoteButton from "./AnswerUpvoteButton";
import AnswerDownvoteButton from "./AnswerDownvoteButton";
import AnswerReplyButton from "./AnswerReplyButton";
import AnswerShareButton from "./AnswerShareButton";
import CreateReply from "./CreateReply";
import { useAuth } from "../../context/AuthContext";

const AnswerFooter = ({
  upvotes,
  answerId,
  onAnswerCreated,
  voteStatus,
  onRequireLogin,
}) => {
  const [reply, setReply] = useState(false);
  const { user } = useAuth();
  const token = user?.token;

  const handleUpvote = async () => {
    if (!token) {
      onRequireLogin?.();
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3000/answers/upvote/${answerId}`,
        {
          method: "PUT",
          headers: {
            "x-access-token": user.token,
          },
        }
      );
      const updatedAnswer = await response.json();
      onAnswerCreated(updatedAnswer);
    } catch (error) {
      console.error("Upvote error:", error.message);
    }
  };

  const handleDownvote = async () => {
    if (!token) {
      onRequireLogin?.();
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3000/answers/downvote/${answerId}`,
        {
          method: "PUT",
          headers: {
            "x-access-token": user.token,
          },
        }
      );
      const updatedAnswer = await response.json();
      onAnswerCreated(updatedAnswer);
    } catch (error) {
      console.error("Downvote error:", error.message);
    }
  };

  const replyToggle = () => {
    if (!token) {
      onRequireLogin?.();
      return;
    }
    setReply((prev) => !prev);
  };

  return (
    <div className="card-footer bg-transparent border-0 p-0 mt-0">
      <div className="d-flex justify-content-between align-items-center mt-2">
        <div className="d-flex gap-2">
          <AnswerUpvotes upvotes={upvotes} />
          <AnswerUpvoteButton
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
