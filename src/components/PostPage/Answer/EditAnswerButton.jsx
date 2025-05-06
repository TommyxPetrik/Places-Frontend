import React from "react";

const EditAnswerButton = ({ onClick, isEditing }) => {
  return (
    <button onClick={onClick} className="btn p-1">
      <i
        className={`bi ${isEditing ? "bi-save" : "bi-pencil-square"}`}
        style={{ fontSize: "0.8rem", color: "cornflowerblue" }}
      ></i>
      <span
        style={{
          marginLeft: "0.3rem",
          color: "cornflowerblue",
          fontSize: "0.8rem",
        }}
      >
        {isEditing ? "Save" : "Edit"}
      </span>
    </button>
  );
};

export default EditAnswerButton;
