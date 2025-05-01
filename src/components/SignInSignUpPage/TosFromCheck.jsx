import React from "react";

const TosFromCheck = ({ value, setChecked, error }) => {
  return (
    <div className="mb-3 form-check d-flex flex-column align-items-center">
      <div className="d-flex gap-2">
        <input
          type="checkbox"
          className={`form-check-input ${error ? "is-invalid" : ""}`}
          id="tos"
          name="tos"
          checked={value}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <label className="form-check-label text-white" htmlFor="tos">
          I agree to the Terms of Service
        </label>
      </div>
      {error && (
        <div className="invalid-feedback d-block text-center">{error}</div>
      )}
    </div>
  );
};

export default TosFromCheck;
