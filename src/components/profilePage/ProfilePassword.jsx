import React from "react";

const ProfilePassword = ({
  isEditing,
  currentPassword,
  setCurrentPassword,
  editedPassword,
  setEditedPassword,
  passwordError,
  onPasswordBlur,
  validatePassword,
  editedConfirmPassword,
  setEditedConfirmPassword,
  confirmPasswordError,
  onConfirmPasswordBlur,
  validateConfirmPassword,
  onToggleEdit,
  onSave,
}) => (
  <div className="col-md-6 mb-3">
    {isEditing ? (
      <div>
        <div className="mb-2">
          <label
            htmlFor="currentPasswordInput"
            className="form-label text-white-50"
          >
            Current Password
          </label>
          <div className="input-group">
            <input
              type="password"
              id="currentPasswordInput"
              className="form-control form-control-sm bg-dark text-white"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter your current password"
            />
          </div>
        </div>

        <div className="mb-2">
          <label
            htmlFor="editedPasswordInput"
            className="form-label text-white-50"
          >
            New Password
          </label>
          <div className="input-group">
            <input
              type="password"
              id="editedPasswordInput"
              className={`form-control form-control-sm bg-dark text-white ${
                passwordError ? "is-invalid" : ""
              }`}
              value={editedPassword}
              onChange={(e) => {
                setEditedPassword(e.target.value);
                if (passwordError) validatePassword(e.target.value);
              }}
              onBlur={onPasswordBlur}
              placeholder="New password (min 6 chars, 1 upper, 1 digit)"
            />
          </div>
          {passwordError && (
            <div className="invalid-feedback d-block">{passwordError}</div>
          )}
        </div>

        <div className="mb-2">
          <label
            htmlFor="editedConfirmPasswordInput"
            className="form-label text-white-50"
          >
            Confirm New Password
          </label>
          <div className="input-group">
            <input
              type="password"
              id="editedConfirmPasswordInput"
              className={`form-control form-control-sm bg-dark text-white ${
                confirmPasswordError ? "is-invalid" : ""
              }`}
              value={editedConfirmPassword}
              onChange={(e) => {
                setEditedConfirmPassword(e.target.value);
                if (confirmPasswordError)
                  validateConfirmPassword(e.target.value);
              }}
              onBlur={onConfirmPasswordBlur}
              placeholder="Confirm new password"
            />
          </div>
          {confirmPasswordError && (
            <div className="invalid-feedback d-block">
              {confirmPasswordError}
            </div>
          )}
        </div>

        <div className="mt-2">
          <button className="btn btn-sm btn-success me-2" onClick={onSave}>
            Save Password
          </button>
          <button className="btn btn-sm btn-secondary" onClick={onToggleEdit}>
            Cancel
          </button>
        </div>
      </div>
    ) : (
      <>
        <strong>Password:</strong> {"*".repeat(10)}
        <button className="btn btn-sm btn-primary ms-2" onClick={onToggleEdit}>
          Edit
        </button>
      </>
    )}
  </div>
);

export default ProfilePassword;
