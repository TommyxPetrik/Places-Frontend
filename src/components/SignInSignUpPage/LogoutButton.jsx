import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/Signin");
  };

  return (
    <button onClick={handleLogout} className="btn btn-primary">
      Log out
    </button>
  );
};

export default LogoutButton;
