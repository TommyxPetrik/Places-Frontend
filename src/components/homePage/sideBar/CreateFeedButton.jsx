import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const CreateFeedButton = ({ first, onRequireLogin }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const token = user?.token;

  const handleClick = () => {
    if (!token) {
      onRequireLogin?.();
      return;
    }
    navigate("/create");
  };
  return (
    <>
      {" "}
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
    </>
  );
};

export default CreateFeedButton;
