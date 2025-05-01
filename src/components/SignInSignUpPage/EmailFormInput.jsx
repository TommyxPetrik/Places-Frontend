import React from "react";

const EmailFormInput = ({ value, setEmail, error, onBlur }) => {
  return (
    <div className="mb-3">
      <label htmlFor="email" className="form-label text-white">
        Email address
      </label>

      <input
        type="email"
        className={`form-control ${error ? "is-invalid" : ""}`}
        id="email"
        name="email"
        aria-describedby="emailHelp"
        placeholder="Email address"
        value={value}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={onBlur}
      />

      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default EmailFormInput;
