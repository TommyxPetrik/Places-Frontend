import React from "react";
import { useNavigate } from "react-router-dom";

const CommentButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/create");
  };
  return (
    <>
      <button
        className="btn btn-outline-secondary text-white bg-primary"
        // onClick={handleClick}
      >
        Create
      </button>
    </>
  );
};

export default CommentButton;
