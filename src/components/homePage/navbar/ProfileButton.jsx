import { useNavigate } from "react-router-dom";
import React from "react";
import { useAuth } from "../../context/AuthContext";

const CreatePostPageButton = () => {
  const { user } = useAuth();
  const token = user?.token;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/profile/${user?.id}`);
  };

  return (
    <button onClick={handleClick} className="btn">
      <i
        className="bi bi-person-circle"
        style={{ fontSize: "1.5rem", color: "cornflowerblue" }}
      ></i>
    </button>
  );
};

export default CreatePostPageButton;
