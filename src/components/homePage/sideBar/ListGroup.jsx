import React from "react";

const ListGroup = ({ first, second, third, fourth }) => {
  return (
    <>
      <div
        className="card bg-dark"
        style={{ width: "12rem", padding: "0rem", maxWidth: "14rem" }}
      >
        <ul className="list-group list-group-flush">
          <li className="list-group-item text-white border-0 mb-1 custom-button d-flex align-items-center ">
            <i
              className="bi bi-house"
              style={{ fontSize: "1rem", color: "cornflowerblue" }}
            ></i>
            <span style={{ marginLeft: "0.5rem" }}>{first}</span>
          </li>
          <li className="list-group-item  text-white border-0 mb-1 custom-button d-flex align-items-center">
            <i
              className="bi bi-arrow-up-right"
              style={{ fontSize: "1rem", color: "cornflowerblue" }}
            ></i>
            <span style={{ marginLeft: "0.5rem" }}>{second}</span>
          </li>
          <li className="list-group-item  text-white border-0 mb-1 custom-button d-flex align-items-center">
            <i
              className="bi bi-people"
              style={{ fontSize: "1rem", color: "cornflowerblue" }}
            ></i>
            <span style={{ marginLeft: "0.5rem" }}>{third}</span>
          </li>
          <li className="list-group-item  text-white border-0 mb-1 custom-button d-flex align-items-center">
            <i
              className="bi bi-bar-chart"
              style={{ fontSize: "1rem", color: "cornflowerblue" }}
            ></i>
            <span style={{ marginLeft: "0.5rem" }}>{fourth}</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ListGroup;
