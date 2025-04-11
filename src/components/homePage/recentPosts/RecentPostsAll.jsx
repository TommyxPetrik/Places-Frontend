import React from "react";
import RecentPost from "./RecentPost";

const RecentPostsAll = () => {
  return (
    <>
      <div
        className="card rounded-3 scroll-container"
        style={{
          marginTop: "2rem",
          padding: "1rem",
          backgroundColor: "rgb(244 244 244 / 0.01)",
          width: "18rem",
        }}
      >
        <h5
          style={{
            width: "12rem",
            display: "flex",
            color: "rgb(96, 103, 109)",
          }}
        >
          Recent posts
        </h5>
        <div>
          <RecentPost
            subplace={"subplace"}
            questiontitle={"questiontitle"}
            username={"username"}
          />
          <RecentPost
            subplace={"subplace"}
            questiontitle={"questiontitle"}
            username={"username"}
          />
          <RecentPost
            subplace={"subplace"}
            questiontitle={"questiontitle"}
            username={"username"}
          />
          <RecentPost
            subplace={"subplace"}
            questiontitle={"questiontitle"}
            username={"username"}
          />
          <RecentPost
            subplace={"subplace"}
            questiontitle={"questiontitle"}
            username={"username"}
          />
          <RecentPost
            subplace={"subplace"}
            questiontitle={"questiontitle"}
            username={"username"}
          />
          <RecentPost
            subplace={"subplace"}
            questiontitle={"questiontitle"}
            username={"username"}
          />
          <RecentPost
            subplace={"subplace"}
            questiontitle={"questiontitle"}
            username={"username"}
          />
          <RecentPost
            subplace={"subplace"}
            questiontitle={"questiontitle"}
            username={"username"}
          />
        </div>
      </div>
    </>
  );
};

export default RecentPostsAll;
