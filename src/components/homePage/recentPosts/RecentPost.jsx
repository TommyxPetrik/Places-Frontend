import React from "react";
import RecentPostBody from "./RecentPostBody";

function RecentPosts() {
  return (
    <>
      <div
        className="card bg-dark text-white mb-3 card-hover p-0"
        style={{ maxWidth: "18rem", maxHeight: "10rem" }}
      >
        <RecentPostBody />
      </div>
    </>
  );
}

export default RecentPosts;
