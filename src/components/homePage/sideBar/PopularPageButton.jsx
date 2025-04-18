import React from "react";
import { useNavigate } from "react-router-dom";

const PopularPageButton = ({ second }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/`);
  };

  return (
    <>
      <div style={{ cursor: "pointer" }}>
        <li className="list-group-item  text-white border-0 mb-1 custom-button d-flex align-items-center">
          <i
            className="bi bi-arrow-up-right"
            style={{ fontSize: "1rem", color: "cornflowerblue" }}
          ></i>
          <span style={{ marginLeft: "0.5rem" }}>{second}</span>
        </li>
      </div>
    </>
  );
};

export default PopularPageButton;
