import React from "react";
import { useState } from "react";
import EmailFormInput from "../components/SignInSignUpPage/EmailFormInput";
import PasswordFormInput from "../components/SignInSignUpPage/PasswordFormInput";
import SignInButtonForm from "../components/SignInSignUpPage/SignInButtonForm";
import { useAuth } from "../components/context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [tosError, setTosError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleEmailBlur = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required.");
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordBlur = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!password) {
      setPasswordError("Password is required.");
    } else if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 6 characters, include one uppercase letter and one number."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email.");
      isValid = false;
    } else {
      setEmailError("");
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 6 characters, include one uppercase letter and one number."
      );
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!isValid) return;

    try {
      const response = await fetch("http://localhost:3000/public/SignIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert("Login failed: " + (errorData.message || response.status));
        return;
      }

      const result = await response.json();
      console.log("Login success:", result);

      login({
        token: result.token,
        email: result.email,
        id: result.id,
      });

      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <EmailFormInput
        value={email}
        setEmail={setEmail}
        error={emailError}
        onBlur={handleEmailBlur}
      />
      <PasswordFormInput
        value={password}
        setPassword={setPassword}
        error={passwordError}
        onBlur={handlePasswordBlur}
      />
      {tosError && <p style={{ color: "red" }}>{tosError}</p>}
      <SignInButtonForm />
    </form>
  );
};

export default SignInPage;
