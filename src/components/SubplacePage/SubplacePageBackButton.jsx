import React from "react";
import { useNavigate } from "react-router-dom";

const PostBackButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };
  return (
    <button
      onClick={handleClick}
      className="btn position-fixed"
      type="button"
      style={{
        backgroundColor: "rgb(24, 28, 31)",
        top: "5rem",
        borderColor: "#444",
      }}
    >
      <i
        className={"bi-arrow-left"}
        style={{ fontSize: "1rem", color: "white" }}
      ></i>
    </button>
  );
};

export default PostBackButton;
