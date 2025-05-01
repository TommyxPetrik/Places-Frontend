import React from "react";
import { useState } from "react";
import ImageUploadButton from "./ImageUploadButton";
import CreateAnswerButton from "./CreateAnswerButton";
import CancelAnswerButton from "./CancelAnswerButton";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const CreateAnswer = ({ onAnswerCreated }) => {
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState("");
  const { postId } = useParams();
  const { user } = useAuth();
  const token = user?.token;

  const handleBlur = () => {
    if (value.trim() === "") {
      setExpanded(false);
    }
  };

  const handleCreateAnswer = async () => {
    if (!value.trim()) return;

    try {
      const response = await fetch(`http://localhost:3000/answers/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({
          body: value,
          question: postId,
        }),
      });

      if (!response) throw new Error("Failed to post answer");

      const answer = await response.json();
      console.log("Answer created");

      setValue("");
      setExpanded(false);

      if (onAnswerCreated) {
        onAnswerCreated();
      }
    } catch (error) {
      console.error("Error fetching subplace: ", error.message);
    }
  };

  return (
    <div className="mb-3 position-relative">
      <textarea
        className="form-control bg-dark text-white white-placeholder"
        placeholder="Add an answer"
        rows={expanded ? 4 : 1}
        onFocus={() => setExpanded(true)}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{
          border: "none",
          resize: "none",
          paddingBottom: expanded ? "2.5rem" : "0.5rem",
        }}
      />

      {expanded && (
        <div
          className="position-absolute d-flex justify-content-between align-items-center px-2"
          style={{
            bottom: "0.5rem",
            left: "0",
            right: "0",
            color: "white",
          }}
        >
          <div className="d-flex gap-3">
            <ImageUploadButton />
          </div>

          <div className="d-flex gap-2">
            <CancelAnswerButton onClick={handleBlur} />
            <CreateAnswerButton onClick={handleCreateAnswer} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateAnswer;
