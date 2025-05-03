import { Button } from "bootstrap";
import React from "react";
import { useNavigate } from "react-router-dom";
import ModalBackdropFade from "../../SignInSignUpPage/ModalBackdropFade";
import SignInErrorModalBody from "../../SignInSignUpPage/SignInErrorModalBody";

const TwoFactorDelete = ({ onClose, onConfirm }) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };
  const bodyText =
    "Are you sure you want to delete this post? This action cannot be undone.";
  const buttonText = "Delete";
  const headerText = "Are you sure?";

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
          handleClick={handleConfirm}
          bodyText={bodyText}
          buttonText={buttonText}
          headerText={headerText}
        />
      </div>
    </>
  );
};

export default TwoFactorDelete;
