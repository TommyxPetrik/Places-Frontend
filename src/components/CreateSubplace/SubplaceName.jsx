import React from "react";

const SubplaceName = ({ value, onChange, onBlur, error }) => {
  const handleChange = (e) => {
    const input = e.target.value.replace(/^s\//, "");
    onChange(`s/${input}`);
  };

  return (
    <div>
      <label htmlFor="subplaceName" className="form-label text-white">
        Subplace Name
      </label>
      <div className="input-group">
        <span className="input-group-text bg-dark text-white" id="prefix">
          s/
        </span>
        <input
          className={`form-control form-control-lg ${
            error ? "is-invalid" : ""
          }`}
          type="text"
          id="subplaceName"
          value={value.replace(/^s\//, "")}
          onChange={handleChange}
          onBlur={onBlur}
          placeholder="Enter name"
          aria-label="Subplace Name"
          aria-describedby="prefix"
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

export default SubplaceName;
