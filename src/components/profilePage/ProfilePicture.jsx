import React from "react";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";

const ProfilePicture = ({ imageLocation, onImageUpload, onDeleteImage }) => {
  const { user } = useAuth();
  const token = user?.token;
  const { userId } = useParams();

  return (
    <>
      <div className="text-center">
        {imageLocation ? (
          <img
            src={`http://localhost:3000/${imageLocation}`}
            alt="Profile"
            className="rounded-circle mb-3"
            style={{ width: 150, height: 150, objectFit: "cover" }}
          />
        ) : (
          <i
            className="bi bi-person-circle"
            style={{ fontSize: "150px", color: "cornflowerblue" }}
          ></i>
        )}
        <div className="d-flex justify-content-center gap-2 mb-3">
          {((token && user.id === userId) || user.role === "admin") && (
            <>
              <label className="btn btn-sm btn-outline-light">
                {imageLocation ? "Replace Image" : "Upload Image"}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={onImageUpload}
                />
              </label>
              {imageLocation && (
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={onDeleteImage}
                >
                  Delete Profile Picture
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePicture;
