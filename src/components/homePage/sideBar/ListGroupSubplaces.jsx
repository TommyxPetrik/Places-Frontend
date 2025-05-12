import React from "react";
import CreateSubplaceButton from "./CreateSubplaceButton";
import { fi } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

const ListGroup = ({ section, first, subplaces, onRequireLogin }) => {
  const navigate = useNavigate();
  const handleNavigate = (id) => {
    navigate(`/subplace/${id}`);
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
        <ul className="list-group list-group-flush">
          <CreateSubplaceButton first={first} onRequireLogin={onRequireLogin} />

          <div>
            {subplaces.map((subplace) => {
              return (
                <div
                  key={subplace._id}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleNavigate(subplace._id)}
                >
                  <li
                    className="list-group-item text-white border-0 mb-1 custom-button d-flex align-items-center"
                    style={{ marginLeft: "0.1rem" }}
                  >
                    <i
                      className="bi bi-geo-alt-fill"
                      style={{
                        color: "cornflowerblue",
                      }}
                    ></i>
                    <span style={{ marginLeft: "0.5rem" }}>
                      {" "}
                      {subplace.name}
                    </span>
                  </li>
                </div>
              );
            })}
          </div>
        </ul>
      </div>
    </>
  );
};

export default ListGroup;
