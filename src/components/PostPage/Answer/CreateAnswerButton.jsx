import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateAnswerButton = ({ onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/create");
  };
  return (
    <>
      <button
        className="btn btn-outline-secondary text-white bg-primary"
        onClick={onClick}
      >
        Create
      </button>
    </>
  );
};

export default CreateAnswerButton;
