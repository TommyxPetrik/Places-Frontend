import React from "react";

const PasswordFormInput = ({ value, setPassword, error, onBlur }) => {
  return (
    <div className="mb-3">
      <label htmlFor="password" className="form-label text-white d-flex">
        Password
      </label>
      <input
        type="password"
        className={`form-control ${error ? "is-invalid" : ""}`}
        id="password"
        name="password"
        placeholder="Password"
        value={value}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={onBlur}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default PasswordFormInput;
