import React from "react";

const AnswerFooter = ({ upvotes, onClick }) => {
  return (
    <div className="card-footer bg-transparent border-0 p-0 mt-0">
      <div className="d-flex justify-content-between align-items-center mt-2">
        <div className="d-flex gap-2">
          <div
            className="btn-upvotes p-2"
            style={{
              fontSize: "0.8rem",
              color: "cornflowerblue",
              backgroundColor: "rgb(15,15,15)",
              marginTop: "0.1rem",
            }}
          >
            {upvotes}
          </div>
          <button className="btn p-1 btnanswers">
            <i
              className="bi bi-arrow-up "
              style={{ fontSize: "0.8rem", color: "cornflowerblue" }}
            ></i>
          </button>
          <button className="btn p-1">
            <i
              className="bi bi-arrow-down"
              style={{ fontSize: "0.8rem", color: "cornflowerblue" }}
            ></i>
          </button>
          <button className="btn p-1">
            <i
              className="bi bi-chat"
              style={{ fontSize: "0.8rem", color: "cornflowerblue" }}
            >
              {" "}
              Reply
            </i>
          </button>
          <button className="btn p-1">
            <i
              className="bi bi-share"
              style={{ fontSize: "0.8rem", color: "cornflowerblue" }}
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnswerFooter;
