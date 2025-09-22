import React from "react";
import "../mystyle.scss";

function Signup() {
  return (
    <>
      <div className="row">
        <h1></h1>
        <button id="toggleDarkMode"></button>
      </div>
      <div className="center-card">
        <div className="card">
          <form id="signupForm">
            <h2>Sign up</h2>
            <div className="row">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                className="input-field"
                placeholder="Username"
                required
              />
            </div>
            <div className="row">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="input-field"
                placeholder="Password"
                required
              />
            </div>
            <div className="row">
              <label htmlFor="password">Retype password</label>
              <input
                type="password"
                id="password"
                className="input-field"
                placeholder="Retype password"
                required
              />
            </div>
            <div className="row">
              <button type="submit" id="signupButton">
                Sign up
              </button>
            </div>
            <p id="create-account">
              <a href="login.html">Been here before? Sign in.</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
