import React from "react";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";

const ProfileEmail = ({
  email,
  isEditing,
  editedEmail,
  setEditedEmail,
  onToggleEdit,
  onSave,
  emailError,
  onEmailBlur,
  validateEmail,
}) => {
  const { user } = useAuth();
  const token = user?.token;
  const { userId } = useParams();

  return (
    <>
      {" "}
      <div className="col-md-6 mb-3">
        {isEditing ? (
          <div>
            <label
              htmlFor="editedEmailInput"
              className="form-label visually-hidden"
            >
              Edit Email
            </label>
            <div className="input-group">
              <input
                type="email"
                id="editedEmailInput"
                className={`form-control form-control-sm bg-dark text-white ${
                  emailError ? "is-invalid" : ""
                }`}
                value={editedEmail}
                onChange={(e) => {
                  setEditedEmail(e.target.value);
                  if (emailError) validateEmail(e.target.value);
                }}
                onBlur={onEmailBlur}
                placeholder="Enter new email"
              />
              <button className="btn btn-sm btn-success" onClick={onSave}>
                Save
              </button>
              <button
                className="btn btn-sm btn-secondary"
                onClick={onToggleEdit}
              >
                Cancel
              </button>
            </div>
            {emailError && (
              <div className="invalid-feedback d-block">{emailError}</div>
            )}
          </div>
        ) : (
          <>
            <strong>Email:</strong> {"*".repeat(email?.length || 0)}
            {((token && user.id === userId) || user.role === "admin") && (
              <button
                className="btn btn-sm btn-primary ms-2"
                onClick={onToggleEdit}
              >
                Edit
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ProfileEmail;
