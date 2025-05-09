import React from "react";

const SignUpPasswords = ({
  password,
  repeatPassword,
  setPassword,
  setRepeatPassword,
  passwordError,
  repeatPasswordError,
  onPasswordBlur,
  onRepeatPasswordBlur,
}) => {
  return (
    <>
      <div className="mb-3">
        <label htmlFor="password" className="form-label text-white">
          Password
        </label>
        <input
          type="password"
          className={`form-control ${passwordError ? "is-invalid" : ""}`}
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={onPasswordBlur}
        />
        {passwordError && (
          <div className="invalid-feedback">{passwordError}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="repeatPassword" className="form-label text-white">
          Repeat Password
        </label>
        <input
          type="password"
          className={`form-control ${repeatPasswordError ? "is-invalid" : ""}`}
          id="repeatPassword"
          placeholder="Repeat Password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          onBlur={onRepeatPasswordBlur}
        />
        {repeatPasswordError && (
          <div className="invalid-feedback">{repeatPasswordError}</div>
        )}
      </div>
    </>
  );
};

export default SignUpPasswords;
