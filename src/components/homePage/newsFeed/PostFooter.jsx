import React from "react";
import PostUpvotes from "./PostUpvotes";
import PostUpvoteButton from "./PostUpvoteButton";
import PostDownvoteButton from "./PostDownvoteButton";
import PostCommentsButton from "./PostCommentsButton";
import PostShareButton from "./PostShareButton";
import { useAuth } from "../../context/AuthContext";
import EditPostButton from "../../PostPage/EditPostButton";
import PostDeleteButton from "./PostDeleteButton";

const PostFooter = ({
  upvotes,
  postId,
  onPostUpdated,
  voteStatus,
  onRequireLogin,
  userId,
  isEditing,
  onEditToggle,
  onSave,
  onRequestDelete,
  answerCount,
}) => {
  const { user } = useAuth();
  const token = user?.token;

  const handleEditClick = () => {
    if (isEditing) {
      onSave();
    } else {
      onEditToggle();
    }
  };

  const handleUpvote = async () => {
    if (!token) {
      onRequireLogin?.();
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3000/questions/upvote/${postId}`,
        {
          method: "PUT",
          headers: {
            "x-access-token": token,
          },
        }
      );
      const updatedPost = await response.json();
      onPostUpdated(updatedPost);
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
        `http://localhost:3000/questions/downvote/${postId}`,
        {
          method: "PUT",
          headers: {
            "x-access-token": token,
          },
        }
      );
      const updatedPost = await response.json();
      onPostUpdated(updatedPost);
    } catch (error) {
      console.error("Downvote error:", error.message);
    }
  };

  return (
    <>
      <div className="card-footer bg-transparent border-0 p-0 mt-0">
        <div className="d-flex justify-content-between align-items-center mt-2">
          <div className="d-flex gap-2">
            <PostUpvotes upvotes={upvotes} />
            <PostUpvoteButton
              onClick={handleUpvote}
              isActive={voteStatus === "upvoted"}
            />
            <PostDownvoteButton
              onClick={handleDownvote}
              isActive={voteStatus === "downvoted"}
            />
            <PostCommentsButton postId={postId} answerCount={answerCount} />
            <PostShareButton postId={postId} />
            {token && user?.id === userId ? (
              <>
                <EditPostButton
                  onClick={handleEditClick}
                  isEditing={isEditing}
                />
                <PostDeleteButton onClick={onRequestDelete} />
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostFooter;
