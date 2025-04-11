import React from "react";

const NavbarSearchBar = () => {
  return (
    <div className="align-items-center w-50 d-flex justify-content-center gap-2">
      <input
        type="text"
        className="align-items-center form-control w-50"
        placeholder="Search..."
      />
      <button className="btn btn-outline-secondary text-white">Search</button>
    </div>
  );
};

export default NavbarSearchBar;
