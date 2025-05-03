import React from "react";

const SignInErrorFooter = ({ handleClick, onClose, buttonText }) => {
  return (
    <>
      <div className="modal-footer">
        <button className="btn btn-secondary" onClick={onClose}>
          Close
        </button>
        <button
          onClick={handleClick}
          className="btn btn-dark btn-outline-secondary text-white mt-2"
        >
          {buttonText}
        </button>
      </div>
    </>
  );
};

export default SignInErrorFooter;
