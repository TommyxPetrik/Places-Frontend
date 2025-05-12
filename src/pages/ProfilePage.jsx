import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "../components/context/AuthContext";
import ProfilePicture from "../components/profilePage/ProfilePicture";
import ProfileName from "../components/profilePage/ProfileName";
import ProfileKarma from "../components/profilePage/ProfileKarma";
import ProfileAge from "../components/profilePage/ProfileAge";
import ProfileUserRole from "../components/profilePage/ProfileUserRole";
import ProfileEmail from "../components/profilePage/ProfileEmail";
import ProfilePassword from "../components/profilePage/ProfilePassword";
import ProfileJoinedSubplaces from "../components/profilePage/ProfileJoinedSubplaces";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ProfileModeratingSubplaces from "../components/profilePage/Moderating";

const ProfilePage = () => {
  const { user, updateUserContext } = useAuth();
  const navigate = useNavigate();
  const { userId } = useParams();
  const token = user?.token;

  const [userData, setUserData] = useState(null);

  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [nameError, setNameError] = useState("");

  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [editedEmail, setEditedEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [editedPassword, setEditedPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [editedConfirmPassword, setEditedConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState("");

  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [showToast, setShowToast] = useState(false);

  const triggerToast = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const fetchUser = useCallback(async () => {
    if (!userId || !token) return;
    try {
      const res = await fetch(`http://localhost:3000/users/${userId}`, {
        method: "GET",
        headers: {
          "x-access-token": token,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Failed to fetch user");
      const data = await res.json();
      setUserData(data);
      setEditedName(data.name || "");
      setEditedEmail(data.email || "");
    } catch (err) {
      console.error("Fetch user error:", err);
      triggerToast("Failed to load user data", "danger");
    }
  }, [userId, token]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const validateName = (nameToValidate = editedName) => {
    if (!nameToValidate.trim()) {
      setNameError("Name cannot be empty.");
      return false;
    }
    setNameError("");
    return true;
  };

  const validateEmail = (emailToValidate = editedEmail) => {
    if (!emailToValidate.trim()) {
      setEmailError("Email cannot be empty.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(emailToValidate)) {
      setEmailError("Invalid email format.");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (passwordToValidate = editedPassword) => {
    if (!passwordToValidate) {
      setPasswordError("Password cannot be empty.");
      return false;
    }
    if (passwordToValidate.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return false;
    }
    if (!/(?=.*[A-Z])/.test(passwordToValidate)) {
      setPasswordError("Password must contain at least one uppercase letter.");
      return false;
    }
    if (!/(?=.*\d)/.test(passwordToValidate)) {
      setPasswordError("Password must contain at least one number.");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const validateCurrentPassword = (value = currentPassword) => {
    if (!value) {
      setCurrentPasswordError("Current password is required.");
      return false;
    }
    setCurrentPasswordError("");
    return true;
  };

  const validateConfirmPassword = (
    confirmPasswordToValidate = editedConfirmPassword,
    passwordToCompare = editedPassword
  ) => {
    if (!confirmPasswordToValidate) {
      setConfirmPasswordError("Confirm password cannot be empty.");
      return false;
    }
    if (confirmPasswordToValidate !== passwordToCompare) {
      setConfirmPasswordError("Passwords do not match.");
      return false;
    }
    setConfirmPasswordError("");
    return true;
  };

  const handleNameBlur = () => validateName();
  const handleEmailBlur = () => validateEmail();
  const handlePasswordBlur = () => {
    validateCurrentPassword();
    validatePassword();
    if (editedConfirmPassword)
      validateConfirmPassword(editedConfirmPassword, editedPassword);
  };

  const handleConfirmPasswordBlur = () => validateConfirmPassword();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      if (userData?.imageLocation) {
        await fetch(`http://localhost:3000/users/deleteProfilePicture`, {
          method: "DELETE",
          headers: { "x-access-token": token },
        });
      }
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch(
        `http://localhost:3000/users/uploadProfilePicture`,
        { method: "POST", headers: { "x-access-token": token }, body: formData }
      );
      if (res.ok) {
        triggerToast("Profile picture uploaded successfully!");
        await fetchUser();
      } else {
        const errorData = await res
          .json()
          .catch(() => ({ message: "Failed to upload image" }));
        triggerToast(errorData.message || "Failed to upload image", "danger");
      }
    } catch (err) {
      triggerToast("Something went wrong during upload", "danger");
    }
  };
  const handleDeleteImage = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/users/deleteProfilePicture`,
        { method: "DELETE", headers: { "x-access-token": token } }
      );
      if (res.ok) {
        triggerToast("Profile picture deleted successfully!");
        await fetchUser();
      } else {
        const errorData = await res
          .json()
          .catch(() => ({ message: "Failed to delete image" }));
        triggerToast(errorData.message || "Failed to delete image", "danger");
      }
    } catch (err) {
      triggerToast("Something went wrong during deletion", "danger");
    }
  };

  const handleEditNameToggle = () => {
    setIsEditingName((prev) => !prev);
    if (!isEditingName) {
      setEditedName(userData?.name || "");
      setNameError("");
    }
  };
  const handleEditEmailToggle = () => {
    setIsEditingEmail((prev) => !prev);
    if (!isEditingEmail) {
      setEditedEmail(userData?.email || "");
      setEmailError("");
    }
  };
  const handleEditPasswordToggle = () => {
    setIsEditingPassword((prev) => !prev);
    if (!isEditingPassword) {
      setEditedPassword("");
      setEditedConfirmPassword("");
      setPasswordError("");
      setConfirmPasswordError("");
    }
  };

  const handleSaveName = async () => {
    if (!validateName()) {
      triggerToast("Please correct the errors.", "warning");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3000/users/changeUsername/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
          body: JSON.stringify({ name: editedName }),
        }
      );
      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Failed to update name" }));
        throw new Error(errorData.message || "Failed to update name");
      }
      await response.json();
      triggerToast("Name updated successfully!");
      if (updateUserContext) updateUserContext({ name: editedName });
      await fetchUser();
      setIsEditingName(false);
    } catch (error) {
      triggerToast(`Error updating name: ${error.message}`, "danger");
    }
  };
  const handleSaveEmail = async () => {
    if (!validateEmail()) {
      triggerToast("Please correct the errors.", "warning");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3000/users/update/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
          body: JSON.stringify({ email: editedEmail }),
        }
      );
      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Failed to update email" }));
        throw new Error(errorData.message || "Failed to update email");
      }
      await response.json();
      triggerToast("Email updated successfully!");
      if (updateUserContext) updateUserContext({ email: editedEmail });
      await fetchUser();
      setIsEditingEmail(false);
    } catch (error) {
      triggerToast(`Error updating email: ${error.message}`, "danger");
    }
  };
  const handleSavePassword = async () => {
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    if (!isPasswordValid || !isConfirmPasswordValid) {
      triggerToast("Please correct the password errors.", "warning");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3000/users/changePasword`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
          body: JSON.stringify({
            currentPassword,
            password: editedPassword,
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Failed to update password" }));
        throw new Error(errorData.message || "Failed to update password");
      }
      await response.json();
      triggerToast("Password updated successfully!");
      setEditedPassword("");
      setEditedConfirmPassword("");
      setIsEditingPassword(false);
    } catch (error) {
      triggerToast(`Error updating password: ${error.message}`, "danger");
    }
  };

  const handleVisitSubplace = (subplaceId) => {
    navigate(`/subplace/${subplaceId}`);
  };

  if (!userData)
    return <div className="text-center mt-5 text-light">Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="card bg-dark text-white shadow-lg rounded-4 p-4">
        <ProfilePicture
          imageLocation={userData.imageLocation}
          onImageUpload={handleImageUpload}
          onDeleteImage={handleDeleteImage}
        />
        <ProfileName
          name={userData.name}
          isEditing={isEditingName}
          editedName={editedName}
          setEditedName={setEditedName}
          onToggleEdit={handleEditNameToggle}
          onSave={handleSaveName}
          nameError={nameError}
          onNameBlur={handleNameBlur}
          validateName={validateName}
        />
        <div className="row mt-3">
          <ProfileKarma karma={userData.karma} />
          <ProfileEmail
            email={userData.email}
            isEditing={isEditingEmail}
            editedEmail={editedEmail}
            setEditedEmail={setEditedEmail}
            onToggleEdit={handleEditEmailToggle}
            onSave={handleSaveEmail}
            emailError={emailError}
            onEmailBlur={handleEmailBlur}
            validateEmail={validateEmail}
          />

          <ProfileUserRole userrole={userData.userrole} />
          <ProfilePassword
            isEditing={isEditingPassword}
            currentPassword={currentPassword}
            setCurrentPassword={setCurrentPassword}
            currentPasswordError={currentPasswordError}
            onCurrentPasswordBlur={() => validateCurrentPassword()}
            editedPassword={editedPassword}
            setEditedPassword={setEditedPassword}
            passwordError={passwordError}
            onPasswordBlur={handlePasswordBlur}
            validatePassword={validatePassword}
            editedConfirmPassword={editedConfirmPassword}
            setEditedConfirmPassword={setEditedConfirmPassword}
            confirmPasswordError={confirmPasswordError}
            onConfirmPasswordBlur={handleConfirmPasswordBlur}
            validateConfirmPassword={validateConfirmPassword}
            onToggleEdit={handleEditPasswordToggle}
            onSave={handleSavePassword}
          />

          <ProfileAge age={userData.age} />
          <ProfileModeratingSubplaces
            userId={userId}
            token={token}
            moderating={userData.moderator || []}
            allSubplaces={userData.subplaces}
            userData={userData}
            fetchUser={fetchUser}
            user={user}
          />
        </div>

        <ProfileJoinedSubplaces
          subplaces={userData.subplaces}
          onVisitSubplace={handleVisitSubplace}
        />
      </div>
      {showToast && (
        <div
          className={`toast align-items-center text-bg-${toastType} border-0 position-fixed top-0 end-0 m-4 show`}
          role="alert"
          style={{ zIndex: 1050, marginTop: "5rem" }}
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">{toastMessage}</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              aria-label="Close"
              onClick={() => setShowToast(false)}
            ></button>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProfilePage;
