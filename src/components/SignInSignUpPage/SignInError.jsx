import { Button } from "bootstrap";
import React from "react";
import { useNavigate } from "react-router-dom";
import ModalBackdropFade from "./ModalBackdropFade";
import SignInErrorModalBody from "./SignInErrorModalBody";

const SignInError = ({ onClose }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/SignIn");
  };
  return (
    <>
      <ModalBackdropFade onClose={onClose} />
      <div
        className="modal show fade d-block"
        tabIndex="-1"
        role="dialog"
        style={{ zIndex: 1050 }}
      >
        <SignInErrorModalBody onClose={onClose} handleClick={handleClick} />
      </div>
    </>
  );
};

export default SignInError;
