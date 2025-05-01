import React from "react";
import { useNavigate } from "react-router-dom";

const SignInButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/SignIn");
  };
  return (
    <>
      <button
        className="btn btn-outline-secondary text-white mt-2"
        onClick={handleClick}
      >
        Sign In
      </button>
    </>
  );
};

export default SignInButton;
