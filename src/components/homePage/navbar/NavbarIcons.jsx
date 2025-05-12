import React from "react";
import CreatePostPageButton from "../../createPost/CreatePostPageButton";
import { Link } from "react-router-dom";
import BellButton from "./BellButton";
import ProfileButton from "./ProfileButton";
import SignInButton from "./SignInButton";
import SignUpButton from "./SignUpButton";
import { useAuth } from "../../context/AuthContext";
import SignoutButton from "./SignoutButton";
import AdminPanelButton from "./AdminPanel";

const NavbarIcons = () => {
  const { user } = useAuth();

  return (
    <div className="d-flex gap-2 align-items-center">
      {user ? (
        <>
          {user.role === "admin" && <AdminPanelButton />}
          <CreatePostPageButton />
          <SignoutButton />
          <ProfileButton />
        </>
      ) : (
        <>
          <SignInButton />
          <SignUpButton />
        </>
      )}
    </div>
  );
};

export default NavbarIcons;
