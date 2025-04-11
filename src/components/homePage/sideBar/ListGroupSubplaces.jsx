import React from "react";

const ListGroup = ({ section, first, subplace }) => {
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
        <ul className="list-group list-group-flush">
          <li className="list-group-item text-white border-0 mb-1 custom-button">
            <i
              className="bi bi-plus"
              style={{ fontSize: "1rem", color: "cornflowerblue" }}
            ></i>
            <span style={{ marginLeft: "0.1rem" }}>{first}</span>
          </li>
          <li className="list-group-item text-white border-0 mb-1 custom-button">
            <i
              className="bi bi-geo-alt-fill"
              style={{
                color: "cornflowerblue",
              }}
            ></i>
            <span style={{ marginLeft: "0.5rem" }}>{subplace}</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ListGroup;
