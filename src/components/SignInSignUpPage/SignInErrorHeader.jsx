import React from "react";

const SignInErrorHeader = ({ onClose }) => {
  return (
    <>
      <div className="modal-header">
        <h5 className="modal-title">Prihlásenie potrebné</h5>
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
