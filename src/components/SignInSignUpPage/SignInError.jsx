import { Button } from "bootstrap";
import React from "react";
import { useNavigate } from "react-router-dom";
import ModalBackdropFade from "./ModalBackdropFade";
import SignInErrorModalBody from "./SignInErrorModalBody";

const SignInError = ({ setShowModal }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    setShowModal(false);
    navigate("/SignIn");
  };

  const onClose = () => {
    setShowModal(false);
  };

  const bodyText = "Please sign in to verify your identity to proceed.";
  const buttonText = "Sign in ";
  const headerText = "Sign In Required";
  return (
    <>
      <ModalBackdropFade onClose={onClose} />
      <div
        className="modal show fade d-block"
        tabIndex="-1"
        role="dialog"
        style={{ zIndex: 1050 }}
      >
        <SignInErrorModalBody
          onClose={onClose}
          handleClick={handleClick}
          bodyText={bodyText}
          headerText={headerText}
          buttonText={buttonText}
        />
      </div>
    </>
  );
};

export default SignInError;
