import React from "react";

const ProfileName = ({
  name,
  isEditing,
  editedName,
  setEditedName,
  onToggleEdit,
  onSave,
  nameError,
  onNameBlur,
  validateName,
}) => (
  <div className="row mt-4 align-items-center justify-content-center">
    <div className="col-md-8 mb-3 text-center">
      {isEditing ? (
        <div>
          <label
            htmlFor="editedNameInput"
            className="form-label visually-hidden"
          >
            Edit Name
          </label>
          <div className="input-group">
            <input
              type="text"
              id="editedNameInput"
              className={`form-control form-control-sm bg-dark text-white ${
                nameError ? "is-invalid" : ""
              }`}
              value={editedName}
              onChange={(e) => {
                setEditedName(e.target.value);
                if (nameError) validateName(e.target.value);
              }}
              onBlur={onNameBlur}
              placeholder="Enter your name"
            />
            <button className="btn btn-sm btn-success" onClick={onSave}>
              Save
            </button>
            <button className="btn btn-sm btn-secondary" onClick={onToggleEdit}>
              Cancel
            </button>
          </div>
          {nameError && (
            <div className="invalid-feedback d-block text-center">
              {nameError}
            </div>
          )}
        </div>
      ) : (
        <h3>
          {name}
          <button
            className="btn btn-sm btn-primary ms-2"
            onClick={onToggleEdit}
          >
            Edit
          </button>
        </h3>
      )}
    </div>
  </div>
);

export default ProfileName;
