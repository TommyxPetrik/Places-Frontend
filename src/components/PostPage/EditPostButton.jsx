import React from "react";

const EditPostButton = ({ onClick, isEditing }) => {
  return (
    <button onClick={onClick} className="btn btn-outline-secondary">
      <i
        className={`bi ${isEditing ? "bi-save" : "bi-pencil-square"}`}
        style={{ fontSize: "1rem", color: "cornflowerblue" }}
      ></i>
      <span style={{ marginLeft: "0.5rem" }}>
        {isEditing ? "Save" : "Edit"}
      </span>
    </button>
  );
};

export default EditPostButton;
