import React from "react";
import { useNavigate } from "react-router-dom";

const CancelAnswerButton = ({ onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/create");
  };
  return (
    <>
      <button
        className="btn btn-outline-secondary text-white"
        // onClick={handleClick}
        onClick={onClick}
      >
        Cancel
      </button>
    </>
  );
};

export default CancelAnswerButton;
