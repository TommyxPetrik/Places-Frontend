import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUpUsername from "../components/SignInSignUpPage/SignUpUsername";
import SignUpEmail from "../components/SignInSignUpPage/SignUpEmail";
import SignUpPasswords from "../components/SignInSignUpPage/SignUpPasswords";
import SignUpButton from "../components/SignInSignUpPage/SignUpButton";
import SignUpTos from "../components/SignInSignUpPage/SignUpTos";
import DateOfBirth from "../components/SignInSignUpPage/DateOfBirth";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");
  const [tosError, setTosError] = useState("");
  const [dob, setDob] = useState("");
  const [dobError, setDobError] = useState("");

  const navigate = useNavigate();

  const validateUsername = () => {
    if (!username.trim()) {
      setUsernameError("Username is required.");
    } else if (username.length < 3 || username.length > 20) {
      setUsernameError("Username must be between 3 and 20 characters.");
    } else if (/[^a-zA-Z0-9]/.test(username)) {
      setUsernameError("Username cannot contain special characters or spaces.");
    } else {
      setUsernameError("");
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setEmailError("Email is required.");
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email.");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{10,}$/;
    if (!password) {
      setPasswordError("Password is required.");
    } else if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 10 characters, include one uppercase letter and one number."
      );
    } else {
      setPasswordError("");
    }
  };

  const validateRepeatPassword = () => {
    if (password !== repeatPassword) {
      setRepeatPasswordError("Passwords do not match.");
    } else {
      setRepeatPasswordError("");
    }
  };

  const validateTos = () => {
    if (!checked) {
      setTosError("You must agree to the Terms of Service.");
    } else {
      setTosError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    validateUsername();
    validateEmail();
    validatePassword();
    validateRepeatPassword();
    validateTos();
    validateDob();

    if (
      usernameError ||
      emailError ||
      passwordError ||
      repeatPasswordError ||
      tosError ||
      dobError
    )
      return;

    try {
      const age = calculateAge(dob);
      const response = await fetch("http://localhost:3000/public/SignUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: username,
          email,
          password,
          password_repeat: repeatPassword,
          age,
        }),
      });

      if (response.ok) {
        navigate("/SignIn");
      } else {
        console.error("Failed to sign up.");
      }
    } catch (error) {
      console.error("Error during sign up:", error.message);
    }
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const validateDob = () => {
    if (!dob) {
      setDobError("Date of birth is required.");
    } else {
      setDobError("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <SignUpUsername
        value={username}
        setValue={setUsername}
        error={usernameError}
        onBlur={validateUsername}
      />
      <SignUpEmail
        value={email}
        setValue={setEmail}
        error={emailError}
        onBlur={validateEmail}
      />
      <SignUpPasswords
        password={password}
        repeatPassword={repeatPassword}
        setPassword={setPassword}
        setRepeatPassword={setRepeatPassword}
        passwordError={passwordError}
        repeatPasswordError={repeatPasswordError}
        onPasswordBlur={validatePassword}
        onRepeatPasswordBlur={validateRepeatPassword}
      />

      <DateOfBirth
        dob={dob}
        setDob={setDob}
        error={dobError}
        onBlur={validateDob}
      />

      <SignUpTos
        checked={checked}
        setChecked={setChecked}
        error={tosError}
        onBlur={validateTos}
      />
      <SignUpButton
        disabled={
          !!usernameError ||
          !!emailError ||
          !!passwordError ||
          !!repeatPasswordError ||
          !!tosError
        }
      />
    </form>
  );
};

export default SignUpPage;
