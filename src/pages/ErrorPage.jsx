import React from "react";
import ErrorPageGoHomeButton from "../components/ErrorPage/ErrorPageGoHomeButton";

const ErrorPage = () => {
  return (
    <>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div className="text-white">
              <h3>We're sorry but this pade does not exist.</h3>
              <ErrorPageGoHomeButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
