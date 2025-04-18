import React from "react";
import { useNavigate } from "react-router-dom";

const CreateSubplaceButton = ({ first }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/`);
  };

  return (
    <>
      <div style={{ cursor: "pointer" }}>
        <li className="list-group-item text-white border-0 mb-1 custom-button">
          <i
            className="bi bi-plus"
            style={{ fontSize: "1rem", color: "cornflowerblue" }}
          ></i>
          <span style={{ marginLeft: "0.1rem" }}>{first}</span>
        </li>
      </div>
    </>
  );
};

export default CreateSubplaceButton;
