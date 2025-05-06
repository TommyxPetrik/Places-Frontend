import React from "react";
import PostTags from "./PostTags";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const PostBodyText = ({
  subplace,
  username,
  time,
  questiontitle,
  questionbody,
  tags,
  edited,
  isEditing,
  onSave,
  editedTitle,
  editedBody,
  setEditedTitle,
  setEditedBody,
}) => {
  const { user } = useAuth();
  const token = user?.token;

  const handleSave = () => {
    onSave(editedTitle, editedBody);
  };

  return (
    <>
      <div className="d-flex align-items-center mb-1">
        <i
          className="bi bi-geo-alt-fill"
          style={{ fontSize: "1rem", color: "cornflowerblue" }}
        ></i>
        <h6 className="mb-0">{subplace}</h6>
        <span
          className="text-white opacity-50"
          style={{ marginLeft: "0.5rem", fontSize: "1rem" }}
        >
          {username}
        </span>
        <span
          className="text-white opacity-50"
          style={{ marginLeft: "0.5rem", fontSize: "0.8rem" }}
        >
          {time}
        </span>
        <span
          className="text-white opacity-50"
          style={{ marginLeft: "0.5rem", fontSize: "0.8rem" }}
        >
          {edited ? (
            <div className="" style={{ color: "cornflowerblue" }}>
              (Edited)
            </div>
          ) : null}
        </span>
        <span
          className="gap-2 d-flex align-items-center justify-content-start flex-grow-1"
          style={{ marginLeft: "1rem" }}
        >
          <PostTags tags={tags} />
        </span>
      </div>
      {isEditing ? (
        <>
          <input
            className="form-control mb-2"
            style={{ color: "white", backgroundColor: "#181c1f" }}
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            className="form-control"
            style={{ color: "white", backgroundColor: "#181c1f" }}
            value={editedBody}
            onChange={(e) => setEditedBody(e.target.value)}
            rows="3"
          />
        </>
      ) : (
        <>
          <h5
            className="card-title text-start"
            style={{ marginBottom: "0rem", fontSize: "1.2rem" }}
          >
            {questiontitle}
          </h5>
          <p
            className="card-text"
            style={{ textAlign: "justify", marginTop: "0rem" }}
          >
            {questionbody}
          </p>
        </>
      )}
    </>
  );
};

export default PostBodyText;
