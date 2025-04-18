import React from "react";
import NavbarIcons from "./NavbarIcons";
import NavbarSearchBar from "./NavbarSeachBar";
import NavbarLogo from "./NavbarLogo";

const Navbar = ({ onClick }) => {
  return (
    <header className="navbar bg-dark p-1 d-flex justify-content-between align-items-center fixed-top">
      <NavbarLogo />
      <NavbarSearchBar />
      <NavbarIcons />
    </header>
  );
};

export default Navbar;
