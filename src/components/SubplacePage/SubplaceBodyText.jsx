import React from "react";
import PostTags from "../homePage/newsFeed/PostTags";

const SubplaceBodyText = ({ time, tags, subplaceName, description }) => {
  return (
    <>
      <div className="d-flex align-items-center mb-1">
        <span
          className="text-white opacity-50"
          style={{ marginLeft: "0.5rem", fontSize: "0.8rem" }}
        >
          created {time}
        </span>
        <span
          className="gap-2 d-flex align-items-center justify-content-start flex-grow-1"
          style={{ marginLeft: "1rem" }}
        >
          <PostTags tags={tags} />
        </span>
      </div>

      <h5
        className="card-title text-start"
        style={{ marginBottom: "0rem", fontSize: "1.2rem" }}
      >
        {subplaceName}
      </h5>
      <p
        className="card-text"
        style={{ textAlign: "justify", marginTop: "0rem" }}
      >
        {description}
      </p>
    </>
  );
};

export default SubplaceBodyText;
