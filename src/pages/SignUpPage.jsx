import React from "react";
import { useState } from "react";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);

  const handleSubmit = (e) => {
    e.target;
    console.log({ email, password, checked });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label
            for="exampleFormControlTextarea1"
            class="form-label text-white d-flex"
          >
            Username
          </label>
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="1"
            placeholder="Username"
          ></textarea>
        </div>
        <div className="mb-3">
          <label
            htmlFor="exampleInputEmail1"
            className="form-label text-white d-flex"
          >
            Email address
          </label>

          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Email adress"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="exampleInputPassword1"
            className="form-label text-white d-flex"
          >
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="exampleInputPassword1"
            className="form-label text-white d-flex"
          >
            Repeat Password
          </label>
          <input
            type="password"
            className="form-control"
            id="repeatpassword"
            placeholder="Repeat Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-3 form-check d-flex gap-2 justify-content-center">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
          <label
            className="form-check-label text-white"
            htmlFor="exampleCheck1"
          >
            I agree to the Terms of Service
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Sign In
        </button>
      </form>
    </>
  );
};

export default SignUpPage;
