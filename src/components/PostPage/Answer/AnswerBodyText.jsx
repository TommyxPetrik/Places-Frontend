import React from "react";

const AnswerBodyText = ({
  subplace,
  username,
  time,
  questiontitle,
  questionbody,
}) => {
  return (
    <>
      <div className="d-flex align-items-center mb-1">
        <i
          className="bi bi-geo-alt-fill"
          style={{ fontSize: "1rem", color: "cornflowerblue" }}
        ></i>
        <h6 className="mb-0">{subplace}</h6>
        <span
          className="text-white opacity-50"
          style={{ marginLeft: "0.5rem" }}
        >
          {username}
        </span>
        <span
          className="text-white opacity-50"
          style={{ marginLeft: "0.5rem" }}
        >
          {time}
        </span>
        <span
          className="gap-2 d-flex align-items-center justify-content-start flex-grow-1"
          style={{ marginLeft: "1rem" }}
        ></span>
      </div>

      <h5 className="card-title text-start" style={{ marginBottom: "0rem" }}>
        {questiontitle}
      </h5>
      <p
        className="card-text"
        style={{ textAlign: "justify", marginTop: "0rem" }}
      >
        {questionbody}
      </p>
    </>
  );
};

export default AnswerBodyText;
