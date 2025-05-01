import React from "react";
import SignInErrorHeader from "./SignInErrorHeader";
import SignInErrorBody from "./SignInErrorBody";
import SignInErrorFooter from "./SignInErrorFooter";

const SignInErrorModalBody = ({ onClose, handleClick }) => {
  return (
    <>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <SignInErrorHeader onClose={onClose} />
          <SignInErrorBody />
          <SignInErrorFooter onClose={onClose} handleClick={handleClick} />
        </div>
      </div>
    </>
  );
};

export default SignInErrorModalBody;
