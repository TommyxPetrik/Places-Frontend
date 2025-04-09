import React from "react";

function ListGroup() {
  return (
    <>
      <div
        className="card bg-dark"
        style={{ width: "14rem", padding: "0rem", maxWidth: "14rem" }}
      >
        <ul className="list-group list-group-flush">
          <li className="list-group-item bg-dark text-white card-hover border-0 mb-1 custom-button">
            Home
          </li>
          <li className="list-group-item bg-dark text-white card-hover border-0 mb-1 custom-button">
            Popular
          </li>
          <li className="list-group-item bg-dark text-white card-hover border-0 mb-1 custom-button">
            Explore
          </li>
          <li className="list-group-item bg-dark text-white card-hover border-0 mb-1 custom-button">
            All
          </li>
        </ul>
      </div>
    </>
  );
}

export default ListGroup;
