import React from "react";

const QuestionBody = ({ value, onChange, onBlur, error }) => {
  return (
    <div className="mb-3">
      <label htmlFor="questionbody" className="form-label text-white">
        Question Body
      </label>
      <textarea
        className={`form-control ${error ? "is-invalid" : ""}`}
        id="questionbody"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        rows="3"
        placeholder="Here you can type your whole question"
      ></textarea>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default QuestionBody;
