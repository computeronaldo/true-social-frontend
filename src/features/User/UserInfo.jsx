import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DefaultUserAvatar from "../../components/DefaultUserAvatar";
import EditProfileModal from "./EditProfileModal";

import { resetEditProfileModal } from "./userSlice";
import "./UserInfo.css";
import { useNavigate } from "react-router-dom";

const UserInfo = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { posts } = useSelector((state) => state.user);

  const [field, setField] = useState("");
  const [openEditProfileModal, setOpenEditProfileModal] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  const handleOpenEditProfileModalBtnClick = (field = "") => {
    setField(field);
    setOpenEditProfileModal(true);
  };

  const closeEditProfileModal = () => {
    dispatch(resetEditProfileModal());
    setOpenEditProfileModal(false);
  };

  return (
    <>
      <EditProfileModal
        field={field}
        openEditProfileModal={openEditProfileModal}
        handleCloseEditProfileModal={closeEditProfileModal}
      />
      <div className="user-info-main">
        <div className="user-info-avatar-container">
          <DefaultUserAvatar />
        </div>
        <div className="user-info-name">
          <h3>{user && user.fullname}</h3>
          <p>@{user && user.username}</p>
        </div>
        <button onClick={() => handleOpenEditProfileModalBtnClick()}>
          Edit Profile
        </button>
        <p className="user-info-bio-container">
          {user && user.bio ? (
            user.bio
          ) : (
            <button
              onClick={() => handleOpenEditProfileModalBtnClick("bio")}
              className="user-info-unavailable"
            >
              Add Bio
            </button>
          )}
        </p>
        <a>
          {user && user.websiteLink ? (
            <a className="user-info-website-link" href={user.websiteLink}>
              {user.websiteLink.replace(/^https?:\/\//, "")}
            </a>
          ) : (
            <button
              onClick={() => handleOpenEditProfileModalBtnClick("websiteLink")}
              className="user-info-unavailable"
            >
              Add your website link
            </button>
          )}
        </a>
        <div className="user-info-stats-container">
          <div className="user-info-stats-item">
            <span>{user && user.following && user.following.length}</span>
            <span>Following</span>
          </div>
          <div className="user-info-stats-item">
            <span>{posts && (posts ? posts.length : 0)}</span>
            <span>Posts</span>
          </div>
          <div className="user-info-stats-item">
            <span>{user && user.followers && user.followers.length}</span>
            <span>Followers</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
