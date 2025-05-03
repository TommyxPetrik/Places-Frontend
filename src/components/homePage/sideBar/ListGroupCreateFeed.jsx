import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CreateFeedButton from "./CreateFeedButton";

const ListGroup = ({ section, first, onRequireLogin }) => {
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
        <CreateFeedButton onRequireLogin={onRequireLogin} first={first} />
      </div>
    </>
  );
};

export default ListGroup;
