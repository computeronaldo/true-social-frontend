import { useSelector, useDispatch } from "react-redux";
import {
  registerUser,
  resetUserRegistration,
  usernameAvailability,
} from "./userSlice";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./Signup.css";

let timer;

const Signup = () => {
  const dispatch = useDispatch();
  const {
    user,
    registerError,
    registerLoading,
    usernameAvailable,
    usernameAvailableLoading,
    usernameAvailableError,
  } = useSelector((selector) => selector.user);

  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
  });

  const [tcAccepted, setTcAccepted] = useState(false);

  const checkUsernameAvailability = (username) => {
    clearTimeout(timer);

    if (username === "") {
      return;
    }

    timer = setTimeout(() => {
      dispatch(usernameAvailability({ username }));
    }, 400);
  };

  const handleFormDataChange = (value, formField) => {
    dispatch(resetUserRegistration());
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [formField]: value,
      };
    });
  };

  const handleUserRegistrationFormSubmission = (e) => {
    e.preventDefault();

    const userInfo = {
      ...formData,
    };

    dispatch(registerUser({ userInfo }));

    setFormData((_prevFormData) => {
      return {
        username: "",
        fullname: "",
        email: "",
        password: "",
      };
    });
    setTcAccepted(false);
  };

  return (
    <main className="signup-main">
      <h1>
        <span className="main-heading-span">True</span> Social
      </h1>
      <section className="signup-form-container">
        {!user && registerLoading === "idle" && (
          <form
            onSubmit={handleUserRegistrationFormSubmission}
            className="signup-form"
          >
            <div className="signup-form-item">
              <label htmlFor="fullnameInput">Fullname</label>
              <input
                required
                value={formData && formData.fullname}
                onChange={(e) =>
                  handleFormDataChange(e.target.value, "fullname")
                }
                type="text"
                id="fullnameInput"
              />
              {registerError && registerError.fullname && (
                <p>{registerError.fullname}</p>
              )}
            </div>
            <div className="signup-form-item">
              <label htmlFor="usernameInput">Username</label>
              <input
                required
                value={formData && formData.username}
                onChange={(e) => {
                  handleFormDataChange(e.target.value, "username");
                  checkUsernameAvailability(e.target.value);
                }}
                type="text"
                id="usernameInput"
              />
              {formData.username !== "" &&
                usernameAvailable &&
                usernameAvailable.availableStatus &&
                usernameAvailableLoading === "idle" &&
                !usernameAvailableError && (
                  <p className="username-available-msg">
                    {usernameAvailable.message}
                  </p>
                )}
              {formData.username !== "" &&
                usernameAvailable &&
                !usernameAvailable.availableStatus &&
                usernameAvailableLoading === "idle" &&
                !usernameAvailableError && (
                  <p className="username-unavailable-msg">
                    {usernameAvailable.message}
                  </p>
                )}
              {registerError && registerError.username && (
                <p>{registerError.username}</p>
              )}
            </div>
            <div className="signup-form-item">
              <label htmlFor="emailInput">Email</label>
              <input
                required
                value={formData && formData.email}
                onChange={(e) => handleFormDataChange(e.target.value, "email")}
                type="email"
                id="emailInput"
              />
              {registerError && registerError.email && (
                <p>{registerError.email}</p>
              )}
            </div>
            <div className="signup-form-item">
              <label htmlFor="passwordInput">Password</label>
              <input
                required
                value={formData && formData.password}
                onChange={(e) =>
                  handleFormDataChange(e.target.value, "password")
                }
                type="password"
                id="passwordInput"
              />
              {registerError && registerError.password && (
                <p>{registerError.password}</p>
              )}
            </div>
            <div className="signup-form-item-checkbox">
              <input
                onChange={(e) => setTcAccepted(e.target.checked)}
                type="checkbox"
                id="t&cInput"
                checked={tcAccepted}
              />
              <label htmlFor="t&cInput">
                I accept all terms and conditions
              </label>
            </div>
            <button
              disabled={
                !tcAccepted ||
                (usernameAvailable && !usernameAvailable.availableStatus) ||
                usernameAvailableLoading !== "idle" ||
                formData.username === ""
              }
              className="create-account-btn"
              type="submit"
            >
              Create New Account
            </button>
          </form>
        )}
        {user && registerLoading === "idle" && (
          <>
            <h3>User Registered Successfully.</h3>
            <NavLink to="/profile">Back to Homepage</NavLink>
          </>
        )}
        {!user && registerLoading === "loading" && (
          <h3 className="loading-text">Registering User...</h3>
        )}
        {!user && registerLoading === "idle" && (
          <NavLink className="login-link" to="/login">
            Already have an account?
          </NavLink>
        )}
      </section>
    </main>
  );
};

export default Signup;
