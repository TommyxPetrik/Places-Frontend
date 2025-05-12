import React from "react";
import AnswerFooter from "./AnswerFooter";
import AnswerBodyText from "./AnswerBodyText";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const AnswerBody = ({
  username,
  body,
  time,
  upvotes,
  onClick,
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
  const { user } = useAuth();
  const token = user?.token;
  const [isEditing, setIsEditing] = useState(false);
  const [editedBody, setEditedBody] = useState(body);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/answers/${answerId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
          body: JSON.stringify({
            body: editedBody,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update post");

      const updatedAnswer = await response.json();
      onAnswerUpdated(onAnswerUpdated);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating post:", error.message);
    }
  };
  return (
    <div>
      <div onClick={onClick} className="card-body d-flex flex-column p-0">
        <AnswerBodyText
          username={username}
          time={time}
          body={body}
          isEditing={isEditing}
          onSave={handleSave}
          editedBody={editedBody}
          setEditedBody={setEditedBody}
          edited={edited}
        />
      </div>
      <div>
        <AnswerFooter
          upvotes={upvotes}
          answerId={answerId}
          onAnswerCreated={onAnswerCreated}
          voteStatus={voteStatus}
          onRequireLogin={onRequireLogin}
          onEditToggle={handleEditToggle}
          onSave={() => handleSave()}
          userId={userId}
          isEditing={isEditing}
          onRequestDelete={onRequestDelete}
          subplaceModerators={subplaceModerators}
        />
      </div>
    </div>
  );
};

export default AnswerBody;
