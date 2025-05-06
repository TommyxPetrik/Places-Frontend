import React from "react";

const AnswerBodyText = ({
  username,
  time,
  body,
  edited,
  isEditing,
  onSave,
  editedTitle,
  editedBody,
  setEditedTitle,
  setEditedBody,
}) => {
  return (
    <>
      <div className="d-flex align-items-center">
        <h6 className="card-title text-start" style={{ marginBottom: "0rem" }}>
          <i
            className="bi bi-person-circle"
            style={{
              fontSize: "1.3rem",
              color: "cornflowerblue",
              marginRight: "0.5rem",
            }}
          ></i>
          {username}
        </h6>
        <span
          className="text-white opacity-50"
          style={{ marginLeft: "0.5rem" }}
        >
          {time}
        </span>
        <span
          className="text-white opacity-50"
          style={{ marginLeft: "0.5rem" }}
        >
          {edited ? (
            <div
              className=""
              style={{ color: "cornflowerblue", fontSize: "0.8rem" }}
            >
              (Edited)
            </div>
          ) : null}
        </span>
      </div>

      {isEditing ? (
        <>
          <textarea
            className="form-control"
            style={{ color: "white", backgroundColor: "#181c1f" }}
            value={editedBody}
            onChange={(e) => setEditedBody(e.target.value)}
            rows="1"
          />
        </>
      ) : (
        <p
          className="card-text"
          style={{
            textAlign: "justify",
            marginTop: "0rem",
            marginLeft: "1rem",
          }}
        >
          {body}
        </p>
      )}
    </>
  );
};

export default AnswerBodyText;
