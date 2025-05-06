import React from "react";

const SelectSubplace = ({ value, onChange, onBlur, error, options }) => {
  return (
    <div className="mb-3">
      <label htmlFor="subplace" className="form-label text-white">
        Select Subplace
      </label>
      <select
        className={`form-select ${error ? "is-invalid" : ""}`}
        id="subplace"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
      >
        <option value="">Select Subplace</option>
        {options.map((subplaceName, index) => (
          <option key={`${subplaceName}-${index}`} value={subplaceName}>
            {subplaceName}
          </option>
        ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default SelectSubplace;
