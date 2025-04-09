import React from "react";

function PostFooter() {
  return (
    <div className="card-footer bg-transparent border-0 p-0 mt-0">
      <div className="d-flex justify-content-between align-items-center mt-2">
        <div className="d-flex gap-2">
          <div
            className="btn-upvotes"
            style={{
              fontSize: "1rem",
              color: "cornflowerblue",
              paddingLeft: "0.5rem",
              paddingRight: "0.5rem",
            }}
          >
            69
          </div>
          <button className="btn btn-outline-secondary">
            <i
              className="bi bi-arrow-up"
              style={{ fontSize: "1rem", color: "cornflowerblue" }}
            ></i>
          </button>
          <button className="btn btn-outline-secondary">
            <i
              className="bi bi-arrow-down"
              style={{ fontSize: "1rem", color: "cornflowerblue" }}
            ></i>
          </button>
          <button className="btn btn-outline-secondary">
            <i
              className="bi bi-chat"
              style={{ fontSize: "1rem", color: "cornflowerblue" }}
            ></i>
          </button>
          <button className="btn btn-outline-secondary">
            <i
              className="bi bi-share"
              style={{ fontSize: "1rem", color: "cornflowerblue" }}
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostFooter;
