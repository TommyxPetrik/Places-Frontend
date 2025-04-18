import React from "react";
import { useNavigate } from "react-router-dom";

const HomePageButton = ({ first }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/`);
  };

  return (
    <>
      <div onClick={handleClick} style={{ cursor: "pointer" }}>
        <li className="list-group-item text-white border-0 mb-1 custom-button d-flex align-items-center">
          <i
            className="bi bi-house"
            style={{ fontSize: "1rem", color: "cornflowerblue" }}
          ></i>
          <span style={{ marginLeft: "0.5rem" }}>{first}</span>
        </li>
      </div>
    </>
  );
};

export default HomePageButton;
