import React from "react";

const SignUpEmail = ({ value, setValue, error, onBlur }) => {
  return (
    <div className="mb-3">
      <label htmlFor="email" className="form-label text-white">
        Email
      </label>
      <input
        type="email"
        className={`form-control ${error ? "is-invalid" : ""}`}
        id="email"
        placeholder="Email"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default SignUpEmail;
