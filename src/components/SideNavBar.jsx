import { useSelector } from "react-redux";

import DefaultUserAvatar from "./DefaultUserAvatar";

import { FaHome } from "react-icons/fa";
import { IoRocketSharp } from "react-icons/io5";
import { FaBookmark } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

import "./SideNavBar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SideNavBar = ({ highlight, openModalHandler }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <>
      <aside>
        <div className="navigation-bar">
          <div className="navigation-container">
            <div
              className={`navigation-item ${
                highlight === "Home" ? "active" : ""
              }`}
            >
              <FaHome />{" "}
              <NavLink to="/home" className="navigation-item-link">
                Home
              </NavLink>
            </div>
            <div
              className={`navigation-item ${
                highlight === "Explore" ? "active" : ""
              }`}
            >
              <IoRocketSharp />{" "}
              <NavLink to="/explore" className="navigation-item-link">
                Explore
              </NavLink>
            </div>
            <div
              className={`navigation-item ${
                highlight === "Bookmark" ? "active" : ""
              }`}
            >
              <FaBookmark />{" "}
              <NavLink to="/bookmark" className="navigation-item-link">
                Bookmark
              </NavLink>
            </div>
            <div
              className={`navigation-item ${
                highlight === "Profile" ? "active" : ""
              }`}
            >
              <FaUser />{" "}
              <NavLink to="/profile" className="navigation-item-link">
                Profile
              </NavLink>
            </div>
            <button
              onClick={() => openModalHandler(true)}
              className="create-new-post-btn"
            >
              Create New Post
            </button>
          </div>
          <div className="user-profile-info">
            <DefaultUserAvatar width="2.5rem" height="2.5rem" />
            <div>
              <strong>{user && user.fullname}</strong>
              <NavLink to="/profile" className="user-profile-link">
                <p>{user && `@${user.username}`}</p>
              </NavLink>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideNavBar;
