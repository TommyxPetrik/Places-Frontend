import React from "react";
import { useNavigate } from "react-router-dom";

const ListGroup = ({ section, first }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/create");
  };
  return (
    <>
      <div
        className="card bg-dark"
        style={{ width: "12rem", padding: "0rem", maxWidth: "14rem" }}
      >
        <div
          className="card-header bg-dark text-white"
          style={{ opacity: "50%" }}
        >
          {section}
        </div>
        <div onClick={handleClick} style={{ cursor: "pointer" }}>
          <ul className="list-group list-group-flush">
            <li className="list-group-item text-white border-0 mb-1 custom-button">
              <i
                className="bi bi-plus"
                style={{ fontSize: "1rem", color: "cornflowerblue" }}
              ></i>
              <span style={{ marginLeft: "0.1rem" }}>{first}</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ListGroup;
