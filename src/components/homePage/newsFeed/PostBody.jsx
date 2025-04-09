import React from "react";
import PostFooter from "./PostFooter";

function PostBody() {
  return (
    <div className="card-body d-flex flex-column" style={{ height: "100%" }}>
      <div className="d-flex align-items-center mb-1">
        <i
          className="bi bi-geo-alt-fill"
          style={{ fontSize: "1rem", color: "cornflowerblue" }}
        ></i>
        <h6 className="mb-0">s/Subplace</h6>
        <span
          className="text-white opacity-50"
          style={{ marginLeft: "0.5rem" }}
        >
          Username
        </span>
        <span
          className="text-white opacity-50"
          style={{ marginLeft: "0.5rem" }}
        >
          2 hours ago
        </span>
      </div>

      <h5 className="card-title text-start" style={{ marginBottom: "0rem" }}>
        Question title
      </h5>
      <p
        className="card-text"
        style={{ textAlign: "justify", marginTop: "0rem" }}
      >
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </p>
      <PostFooter />
    </div>
  );
}

export default PostBody;
