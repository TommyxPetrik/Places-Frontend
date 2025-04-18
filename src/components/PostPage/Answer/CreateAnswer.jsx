import React from "react";
import { useState } from "react";
import ImageUploadButton from "./ImageUploadButton";
import CommentButton from "./CommentButton";
import CancelCommentButton from "./CancelCommentButton";

const CreateAnswer = () => {
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState("");

  const handleBlur = () => {
    if (value.trim() === "") {
      setExpanded(false);
    }
  };

  return (
    <div className="mb-3 position-relative">
      <textarea
        className="form-control bg-dark text-white white-placeholder"
        placeholder="Add an answer"
        rows={expanded ? 4 : 1}
        onFocus={() => setExpanded(true)}
        // onBlur={handleBlur}
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
          className="position-absolute d-flex justify-content-start gap-3 px-2"
          style={{
            bottom: "0.5rem",
            left: "0",
            right: "0",
            color: "white",
          }}
        >
          <ImageUploadButton />
          <CancelCommentButton onClick={handleBlur} />
          <CommentButton />
        </div>
      )}
    </div>
  );
};

export default CreateAnswer;
