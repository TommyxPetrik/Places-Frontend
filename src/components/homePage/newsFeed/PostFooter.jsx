import React from "react";
import PostUpvotes from "./PostUpvotes";
import PostUpvoteButton from "./PostUpvoteButton";
import PostDownvoteButton from "./PostDownvoteButton";
import PostCommentsButton from "./PostCommentsButton";
import PostShareButton from "./PostShareButton";

const PostFooter = ({ upvotes, postId, onPostUpdated }) => {
  const handleUpvote = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/questions/upvote/${postId}`,
        {
          method: "PUT",
        }
      );
      const updatedPost = await response.json();
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
      onPostUpdated(updatedPost);
    } catch (error) {
      console.error("Downvote error:", error.message);
    }
  };

  return (
    <div className="card-footer bg-transparent border-0 p-0 mt-0">
      <div className="d-flex justify-content-between align-items-center mt-2">
        <div className="d-flex gap-2">
          <PostUpvotes upvotes={upvotes} />
          <PostUpvoteButton onClick={handleUpvote} />
          <PostDownvoteButton onClick={handleDownvote} />
          <PostCommentsButton postId={postId} />
          <PostShareButton />
        </div>
      </div>
    </div>
  );
};

export default PostFooter;
