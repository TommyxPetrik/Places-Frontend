import React from "react";
import RecentPostBody from "./RecentPostBody";

const RecentPosts = ({ subplace, questiontitle, username }) => {
  return (
    <>
      <div
        className="card bg-dark text-white mb-3 card-hover p-3"
        style={{ width: "16rem", height: "6rem" }}
      >
        <RecentPostBody
          subplace={subplace}
          questiontitle={questiontitle}
          username={username}
        />
      </div>
    </>
  );
};

export default RecentPosts;
