import React from "react";
import PostBody from "./PostBody";

function Newsfeed() {
  return (
    <>
      <div
        className="card card-hover"
        style={{
          width: "46rem",
          minHeight: "11rem",
          maxHeight: "30rem",
          marginTop: "2rem",
          marginLeft: "2rem",
          paddingTop: "0rem",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          paddingBottom: "0rem",
          borderRadius: "1rem",
          backgroundColor: "#181c1f",
          color: "white",
        }}
      >
        <PostBody />
      </div>
    </>
  );
}

export default Newsfeed;
