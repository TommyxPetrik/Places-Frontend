import React from "react";
import { useNavigate } from "react-router-dom";

const AdminPanelButton = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/admin");
  };

  return (
    <button
      onClick={handleNavigate}
      className="btn btn-outline-secondary text-white mt-2"
    >
      Admin
    </button>
  );
};

export default AdminPanelButton;
