import React from "react";
import { useNavigate } from "react-router-dom";

const SignUpButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/SignUp");
  };
  return (
    <>
      <button
        className="btn btn-outline-secondary text-white mt-2"
        onClick={handleClick}
      >
        Sign Up
      </button>
    </>
  );
};

export default SignUpButton;
