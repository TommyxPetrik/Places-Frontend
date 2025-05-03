import React from "react";
import SignInErrorHeader from "./SignInErrorHeader";
import SignInErrorBody from "./SignInErrorBody";
import SignInErrorFooter from "./SignInErrorFooter";

const SignInErrorModalBody = ({
  onClose,
  handleClick,
  bodyText,
  buttonText,
  headerText,
}) => {
  return (
    <>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <SignInErrorHeader onClose={onClose} headerText={headerText} />
          <SignInErrorBody bodyText={bodyText} />
          <SignInErrorFooter
            onClose={onClose}
            handleClick={handleClick}
            buttonText={buttonText}
          />
        </div>
      </div>
    </>
  );
};

export default SignInErrorModalBody;
