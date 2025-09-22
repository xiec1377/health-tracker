import React from "react";
import "../mystyle.scss";

function Login() {
  return (
    <>
      <div className="row">
        <h1></h1>
        <button id="toggleDarkMode"></button>
      </div>
      <div className="center-card">
        <div className="card">
          <form id="loginForm">
            <h2>Please log in</h2>
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
              <button type="submit" id="loginButton">
                Login
              </button>
            </div>
            <p id="create-account">
              <a href="signup.html">New user? Sign up here.</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
