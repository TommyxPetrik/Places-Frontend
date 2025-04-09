import React from "react";

function Navbar() {
  return (
    <header className="navbar bg-dark p-1 d-flex justify-content-between align-items-center fixed-top">
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

      <div className="align-items-center w-50 d-flex justify-content-center gap-2">
        <input
          type="text"
          className="align-items-center form-control w-50"
          placeholder="Search..."
        />
        <button className="btn btn-outline-secondary text-white">Search</button>
      </div>

      <div className="d-flex gap-2">
        <button className="btn btn-outline-secondary text-white">Create</button>
        <button className="btn btn-outline-secondary">🔔</button>
        <button className="btn btn-outline-dark">👤</button>
      </div>
    </header>
  );
}

export default Navbar;
