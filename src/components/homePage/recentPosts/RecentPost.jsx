import React from "react";
import RecentPostBody from "./RecentPostBody";
import { useNavigate } from "react-router-dom";

const RecentPosts = ({
  subplace,
  questiontitle,
  username,
  time,
  onClick,
  postId,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${postId}`);
  };
  return (
    <>
      <div
        onClick={handleClick}
        className="card bg-dark text-white mb-3 card-hover p-3"
        style={{ width: "16rem", height: "6rem", cursor: "pointer" }}
      >
        <RecentPostBody
          subplace={subplace}
          questiontitle={questiontitle}
          username={username}
          time={time}
          onClick={onClick}
        />
      </div>
    </>
  );
};

export default RecentPosts;
