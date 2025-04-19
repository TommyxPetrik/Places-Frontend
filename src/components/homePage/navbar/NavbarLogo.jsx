import React from "react";
import { useNavigate } from "react-router-dom";

const NavbarLogo = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };
  return (
    <div
      onClick={handleClick}
      className="d-flex align-items-center gap-2"
      style={{ cursor: "pointer" }}
    >
      <i
        className="bi bi-geo-alt-fill"
        style={{
          fontSize: "2rem",
          color: "cornflowerblue",
          marginBottom: "0.5rem",
          marginLeft: "1rem",
        }}
      ></i>
      <span className="fw-bold text-white">
        <h2>Places</h2>
      </span>
    </div>
  );
};

export default NavbarLogo;
