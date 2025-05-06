import React from "react";

const SubplaceDescription = ({ value, onChange, onBlur, error }) => {
  return (
    <div className="mt-3">
      <label htmlFor="subplaceDescription" className="form-label text-white">
        Subplace Description
      </label>
      <input
        className={`form-control form-control-lg ${error ? "is-invalid" : ""}`}
        type="text"
        id="subplaceDescription"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder="Subplace Description"
        aria-label=".form-control-lg example"
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default SubplaceDescription;
