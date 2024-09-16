import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "./userSlice";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { user, loginLoading, loginError } = useSelector((state) => state.user);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [rememberMe, setRememberMe] = useState(false);

  const handleLoginFormSubmission = (e) => {
    e.preventDefault();

    dispatch(loginUser({ username, password }));
    setUsername("");
    setPassword("");
  };

  console.log(user);

  return (
    <main className="login-main">
      <h1>
        <span className="main-heading-span">True</span> Social
      </h1>
      <section className="login-form-container">
        {!user && loginLoading === "idle" && (
          <>
            <form onSubmit={handleLoginFormSubmission} className="login-form">
              <h3 className="login-form-heading">Login</h3>
              <div className="login-form-item">
                <label htmlFor="usernameInput">Username</label>
                <input
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  id="usernameInput"
                />
              </div>
              <div className="login-form-item">
                <label htmlFor="passwordInput">Password</label>
                <input
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="passwordInput"
                  minLength={8}
                />
              </div>
              <div className="login-form-btns">
                <div className="login-form-remember-me-input">
                  <input
                    onChange={(e) => setRememberMe(e.target.checked)}
                    type="checkbox"
                    id="rememberMeInput"
                  />
                  <label htmlFor="rememberMeInput">Remember Me</label>
                </div>
                <NavLink>Forgot your password?</NavLink>
              </div>
              <button type="submit" className="login-btn">
                Login
              </button>
              {location.state && location.state.message && (
                <h4>{location.state.message}</h4>
              )}
            </form>
          </>
        )}
        {!user &&
          loginLoading === "idle" &&
          loginError &&
          (loginError === "Please set a password for your account!!" ? (
            <NavLink to="/setNewPassword" className="reset-password-link">
              Please set a new password for your account!!
            </NavLink>
          ) : (
            <h3 style={{ marginTop: "1.5rem" }}>{loginError}</h3>
          ))}
        {!user && !loginError && loginLoading === "loading" && (
          <h3 className="loading-text">Logging User In...</h3>
        )}
        {user && !loginError && loginLoading === "idle" && (
          <>
            <h3>Logged in successfully!!</h3>
            <NavLink to="/home">Back to Homepage</NavLink>
          </>
        )}
      </section>
    </main>
  );
};

export default Login;
