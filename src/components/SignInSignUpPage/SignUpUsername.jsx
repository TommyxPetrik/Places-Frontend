import React from "react";

const SignUpUsername = ({ value, setValue, error, onBlur }) => {
  return (
    <div className="mb-3">
      <label htmlFor="username" className="form-label text-white">
        Username
      </label>
      <input
        type="text"
        className={`form-control ${error ? "is-invalid" : ""}`}
        id="username"
        placeholder="Username"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default SignUpUsername;
