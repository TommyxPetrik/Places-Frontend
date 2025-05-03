import React from "react";

const SignInErrorHeader = ({ onClose, headerText }) => {
  return (
    <>
      <div className="modal-header">
        <h5 className="modal-title">{headerText}</h5>
        <button
          type="button"
          className="btn-close"
          onClick={onClose}
          aria-label="Zavrieť"
        ></button>
      </div>
    </>
  );
};

export default SignInErrorHeader;
