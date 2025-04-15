import React from "react";

const NavbarIcons = ({ onClick }) => {
  return (
    <div className="d-flex gap-2">
      <button
        onClick={onClick}
        className="btn btn-outline-secondary text-white"
      >
        Create
      </button>
      <button className="btn btn-outline-secondary">🔔</button>
      <button className="btn btn-outline-dark">👤</button>
    </div>
  );
};

export default NavbarIcons;
