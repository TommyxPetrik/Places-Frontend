import React from "react";

const AnswerBodyText = ({ username, time, body }) => {
  return (
    <>
      <div className="d-flex align-items-center">
        <h6 className="card-title text-start" style={{ marginBottom: "0rem" }}>
          <i
            className="bi bi-person-circle"
            style={{
              fontSize: "1.3rem",
              color: "cornflowerblue",
              marginRight: "0.5rem",
            }}
          ></i>
          {username}
        </h6>
        <span
          className="text-white opacity-50"
          style={{ marginLeft: "0.5rem" }}
        >
          {time}
        </span>
      </div>

      <p
        className="card-text"
        style={{ textAlign: "justify", marginTop: "0rem", marginLeft: "1rem" }}
      >
        {body}
      </p>
    </>
  );
};

export default AnswerBodyText;
