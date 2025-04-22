import React from "react";
import PostUpvotes from "./PostUpvotes";
import PostUpvoteButton from "./PostUpvoteButton";
import PostDownvoteButton from "./PostDownvoteButton";
import PostCommentsButton from "./PostCommentsButton";
import PostShareButton from "./PostShareButton";
import { useState, useEffect } from "react";

const PostFooter = ({ upvotes, postId, onPostUpdated, voteStatus }) => {
  const [localVoteStatus, setLocalVoteStatus] = useState(voteStatus);

  const handleUpvote = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/questions/upvote/${postId}`,
        {
          method: "PUT",
        }
      );
      const updatedPost = await response.json();
      setLocalVoteStatus((prev) => (prev === "upvoted" ? null : "upvoted"));
      onPostUpdated(updatedPost);
    } catch (error) {
      console.error("Upvote error:", error.message);
    }
  };

  const handleDownvote = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/questions/downvote/${postId}`,
        {
          method: "PUT",
        }
      );
      const updatedPost = await response.json();
      setLocalVoteStatus((prev) => (prev === "downvoted" ? null : "downvoted"));
      onPostUpdated(updatedPost);
    } catch (error) {
      console.error("Downvote error:", error.message);
    }
  };

  useEffect(() => {
    setLocalVoteStatus(voteStatus);
  }, [voteStatus]);

  return (
    <div className="card-footer bg-transparent border-0 p-0 mt-0">
      <div className="d-flex justify-content-between align-items-center mt-2">
        <div className="d-flex gap-2">
          <PostUpvotes upvotes={upvotes} />
          <PostUpvoteButton
            onClick={handleUpvote}
            isActive={localVoteStatus === "upvoted"}
          />
          <PostDownvoteButton
            onClick={handleDownvote}
            isActive={localVoteStatus === "downvoted"}
          />
          <PostCommentsButton postId={postId} />
          <PostShareButton />
        </div>
      </div>
    </div>
  );
};

export default PostFooter;
