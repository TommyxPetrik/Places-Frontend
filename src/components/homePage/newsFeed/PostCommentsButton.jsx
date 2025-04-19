import React from "react";
import { useNavigate } from "react-router-dom";

const PostCommentsButton = ({ postId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${postId}`);
  };
  return (
    <>
      <button onClick={handleClick} className="btn btn-outline-secondary">
        <i
          className="bi bi-chat"
          style={{ fontSize: "1rem", color: "cornflowerblue" }}
        ></i>
      </button>
    </>
  );
};

export default PostCommentsButton;
