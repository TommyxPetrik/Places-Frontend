import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const ProfileModeratingSubplaces = ({
  userId,
  token,
  moderating,
  allSubplaces,
  fetchUser,
  userData,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [selectedToAdd, setSelectedToAdd] = useState([]);
  const { user } = useAuth();

  const handleAdd = async () => {
    try {
      for (const subplaceId of selectedToAdd) {
        await fetch("http://localhost:3000/subplace/updateModerators", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
          body: JSON.stringify({ userId, subplaceId }),
        });
      }
      await fetchUser();
      setSelectedToAdd([]);
      setIsAdding(false);
    } catch (err) {
      console.error("Error adding moderator:", err);
    }
  };

  const handleRemove = async (subplaceId) => {
    try {
      await fetch("http://localhost:3000/subplace/deleteModerator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({ userId, subplaceId }),
      });
      await fetchUser();
    } catch (err) {
      console.error("Error removing moderator:", err);
    }
  };

  const availableToAdd = allSubplaces.filter(
    (subplace) => !moderating.includes(subplace._id)
  );

  return (
    <div className="mt-4">
      <h5>Moderating:</h5>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {moderating.length === 0 ? (
          <div className="col-lg-12">
            <span className="text-white">
              Currently not moderating any subplaces.
            </span>
          </div>
        ) : (
          moderating.map((moderating) => (
            <div
              key={moderating._id}
              className="badge bg-primary d-flex align-items-center gap-1"
            >
              {moderating.name}
              {user.role === "admin" && (
                <button
                  type="button"
                  aria-label="Remove"
                  onClick={() => handleRemove(moderating._id)}
                  className="btn-close btn-close-white btn-sm ms-2"
                ></button>
              )}
            </div>
          ))
        )}
      </div>

      {isAdding ? (
        <div className="mt-3 d-flex justify-content-center align-items-center gap-2 col-lg-12">
          <select
            multiple
            onChange={(e) =>
              setSelectedToAdd(
                [...e.target.selectedOptions].map((opt) => opt.value)
              )
            }
          >
            {availableToAdd.map((subplace) => (
              <option key={subplace._id} value={subplace._id}>
                {subplace.name}
              </option>
            ))}
          </select>
          <button className="btn btn-sm btn-primary ms-2" onClick={handleAdd}>
            Save
          </button>
        </div>
      ) : (
        <>
          {user.role === "admin" && (
            <button
              className="mt-3 btn btn-sm btn-primary ms-2"
              onClick={() => setIsAdding(true)}
            >
              Add
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ProfileModeratingSubplaces;
