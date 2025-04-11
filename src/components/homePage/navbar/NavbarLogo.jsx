import React from "react";

const NavbarLogo = () => {
  return (
    <div className="d-flex align-items-center gap-2">
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
