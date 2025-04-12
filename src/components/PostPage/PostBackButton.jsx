import React from "react";

const PostBackButton = ({ onBack }) => {
  return (
    <button
      onClick={onBack}
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
