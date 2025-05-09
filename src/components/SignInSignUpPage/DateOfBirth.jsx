import React from "react";

const DateOfBirth = ({ dob, setDob, error, onBlur }) => {
  return (
    <div className="mb-3">
      <label htmlFor="dob" className="form-label text-white">
        Date of Birth
      </label>
      <input
        type="date"
        className={`form-control ${error ? "is-invalid" : ""}`}
        id="dob"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        onBlur={onBlur}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default DateOfBirth;
