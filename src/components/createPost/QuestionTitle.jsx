import React from "react";

const QuestionTitle = ({ value, onChange, onBlur, error }) => {
  return (
    <div className="mb-3">
      <label htmlFor="questiontitle" className="form-label text-white">
        Question Title
      </label>
      <input
        className={`form-control form-control-lg ${error ? "is-invalid" : ""}`}
        type="text"
        id="questiontitle"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder="Question Title"
        aria-label="Question Title"
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default QuestionTitle;
