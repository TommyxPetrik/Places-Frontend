import React from "react";

const SignInErrorBody = ({ bodyText }) => {
  return (
    <>
      <div className="modal-body">
        <p>{bodyText}</p>
      </div>
    </>
  );
};

export default SignInErrorBody;
