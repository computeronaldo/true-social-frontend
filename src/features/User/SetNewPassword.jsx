import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { setNewPassword } from "./userSlice";

import "./SetNewPassword.css";

const SetNewPassword = () => {
  const dispatch = useDispatch();

  const { user, setNewPasswordLoading, setNewPasswordError } = useSelector(
    (state) => state.user
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSetNewPasswordFormSubmission = (e) => {
    e.preventDefault();

    dispatch(setNewPassword({ username, password }));

    setUsername("");
    setNewPassword("");
  };

  return (
    <>
      <main className="reset-password-main">
        <h1>
          <span className="main-heading-span">True</span> Social
        </h1>
        <section className="reset-password-form-container">
          {!user && setNewPasswordLoading === "idle" && (
            <form
              onSubmit={handleSetNewPasswordFormSubmission}
              className="reset-password-form"
            >
              <div className="reset-password-form-item">
                <label htmlFor="usernameInput">Username</label>
                <input
                  required
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  type="text"
                  id="usernameInput"
                />
              </div>
              <div className="reset-password-form-item">
                <label htmlFor="passwordInput">New Password</label>
                <input
                  required
                  minLength={8}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                  id="passwordInput"
                />
              </div>
              <button type="submit" className="reset-password-btn">
                Set New Password
              </button>
            </form>
          )}
          {user && setNewPasswordLoading === "idle" && !setNewPasswordError && (
            <>
              <h3>Password set successfully!</h3>
              <NavLink to="/home">Back to homepage</NavLink>
            </>
          )}
          {!user &&
            setNewPasswordLoading === "loading" &&
            !setNewPasswordError && (
              <h3 className="loading-message">Setting new password</h3>
            )}
          {!user && setNewPasswordLoading === "idle" && setNewPasswordError && (
            <h3>{setNewPasswordError}</h3>
          )}
        </section>
      </main>
    </>
  );
};

export default SetNewPassword;
