import React from "react";

const SubplaceJoinButton = ({ onClick, isActive, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-outline-secondary ${isActive ? "active" : ""}`}
    >
      {isActive ? "Leave" : "Join"}
    </button>
  );
};

export default SubplaceJoinButton;
