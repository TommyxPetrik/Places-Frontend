import React from "react";
import RecentPost from "./RecentPost";

function RecentPostsAll() {
  return (
    <>
      <div
        className="card rounded-3"
        style={{
          marginTop: "2rem",
          padding: "1rem",
          backgroundColor: "rgb(244 244 244 / 0.01)",
        }}
      >
        <div className="scroll-container">
          <RecentPost />
          <RecentPost />
          <RecentPost />
          <RecentPost />
          <RecentPost />
          <RecentPost />
          <RecentPost />
          <RecentPost />
          <RecentPost />
        </div>
      </div>
    </>
  );
}

export default RecentPostsAll;
