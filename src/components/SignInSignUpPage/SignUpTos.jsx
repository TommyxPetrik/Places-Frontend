import React from "react";

const SignUpTos = ({ checked, setChecked, error, onBlur }) => {
  return (
    <div className="mb-3 form-check d-flex gap-2 justify-content-center">
      <input
        type="checkbox"
        className={`form-check-input ${error ? "is-invalid" : ""}`}
        id="tos"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        onBlur={onBlur}
      />
      <label className="form-check-label text-white" htmlFor="tos">
        I agree to the Terms of Service
      </label>
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};

export default SignUpTos;
