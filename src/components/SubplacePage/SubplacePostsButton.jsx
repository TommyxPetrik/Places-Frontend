import React from "react";
import { useNavigate } from "react-router-dom";

const SubplacePostsButton = ({ subplaceId, questionCount }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/subplace/${subplaceId}`);
  };
  return (
    <>
      <button onClick={handleClick} className="btn btn-outline-secondary">
        <i
          className="bi bi-chat"
          style={{ fontSize: "1rem", color: "cornflowerblue" }}
        ></i>
        <span style={{ fontSize: "0.8rem", color: "white" }}>
          {" "}
          {questionCount}
        </span>
      </button>
    </>
  );
};

export default SubplacePostsButton;
