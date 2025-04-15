import React from "react";

const QuestionBody = ({value, onChange}) => {
  return (
    <>
      <div className="mb-3">
        <label htmlFor="questionbody" className="form-label text-white">
          Question Body
        </label>
        <textarea
          className="form-control"
          id="questionbody"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows="3"
          placeholder="Here you can type your whole question"
        ></textarea>
      </div>
    </>
  );
};

export default QuestionBody;
