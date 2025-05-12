import React from "react";
import PostFooter from "./PostFooter";
import PostBodyText from "./PostBodyText";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const PostBody = ({
  subplaceName,
  subplaceModerators,
  username,
  time,
  questiontitle,
  questionbody,
  tags,
  upvotes,
  postId,
  onPostUpdated,
  voteStatus,
  onRequireLogin,
  userId,
  edited,
  onRequestDelete,
  answerCount,
  subplaceId,
  trim,
}) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAuth();
  const token = user?.token;
  const [editedTitle, setEditedTitle] = useState(questiontitle);
  const [editedBody, setEditedBody] = useState(questionbody);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleClick = () => {
    navigate(`/post/${postId}`);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/questions/${postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
          body: JSON.stringify({
            title: editedTitle,
            body: editedBody,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update post");

      const updatedPost = await response.json();
      onPostUpdated(updatedPost);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating post:", error.message);
    }
  };

  return (
    <div>
      <div
        onClick={handleClick}
        className="card-body d-flex flex-column"
        style={{ height: "100%", cursor: "pointer", width: "35rem" }}
      >
        <PostBodyText
          subplaceName={subplaceName}
          username={username}
          time={time}
          questiontitle={questiontitle}
          questionbody={questionbody}
          tags={tags}
          isEditing={isEditing}
          onSave={handleSave}
          editedTitle={editedTitle}
          editedBody={editedBody}
          setEditedTitle={setEditedTitle}
          setEditedBody={setEditedBody}
          edited={edited}
          subplaceId={subplaceId}
          trim={trim}
        />
      </div>
      <div>
        <PostFooter
          upvotes={upvotes}
          subplaceModerators={subplaceModerators}
          postId={postId}
          onPostUpdated={onPostUpdated}
          voteStatus={voteStatus}
          onRequireLogin={onRequireLogin}
          onEditToggle={handleEditToggle}
          onSave={() => handleSave()}
          userId={userId}
          isEditing={isEditing}
          onRequestDelete={onRequestDelete}
          answerCount={answerCount}
        />
      </div>
    </div>
  );
};

export default PostBody;
