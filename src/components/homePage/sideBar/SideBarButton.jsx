import React from "react";
import { useState } from "react";

const SideBarButton = ({ onClick, isOpen }) => {
  return (
    <button
      className="btn position-fixed"
      type="button"
      onClick={onClick}
      style={{
        backgroundColor: "rgb(24, 28, 31)",
        top: "5rem",
        left: isOpen ? "13.7rem" : "0.5rem",
        zIndex: 1051,
        borderColor: "#444",
      }}
    >
      <i
        className={`bi ${isOpen ? "bi-arrow-left" : "bi-list"}`}
        style={{ fontSize: "1rem", color: "white" }}
      ></i>
    </button>
  );
};

export default SideBarButton;
