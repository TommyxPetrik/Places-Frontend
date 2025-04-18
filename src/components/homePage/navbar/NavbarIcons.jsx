import React from "react";
import CreatePostPageButton from "../../createPost/CreatePostButton";
import { Link } from "react-router-dom";
import BellButton from "./BellButton";
import ProfileButton from "./ProfileButton";

const NavbarIcons = ({}) => {
  return (
    <div className="d-flex gap-2">
      <CreatePostPageButton />
      <BellButton />
      <ProfileButton />
    </div>
  );
};

export default NavbarIcons;
