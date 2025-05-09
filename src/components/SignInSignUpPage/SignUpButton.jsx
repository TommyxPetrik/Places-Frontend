import React from "react";

const SignUpButton = ({ disabled }) => {
  return (
    <button type="submit" className="btn btn-primary" disabled={disabled}>
      Sign Up
    </button>
  );
};

export default SignUpButton;
