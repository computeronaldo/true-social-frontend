import DefaultUserAvatar from "./DefaultUserAvatar";

import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unFollowUser } from "../features/User/userSlice";

import "./SideBarSuggestionUser.css";
import { useEffect } from "react";

const SideBarSuggestionUser = ({ userToFollow }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const userId = user && user._id;

  const handleFollowUserBtnClick = (toFollowUserId) => {
    if (userId && toFollowUserId) {
      dispatch(followUser({ toFollowUserId, userId }));
    }
  };

  const handleUnfollowBtnClick = (toUnFollowUserId) => {
    if (userId && toUnFollowUserId) {
      dispatch(unFollowUser({ toUnFollowUserId, userId }));
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <div className="user-follow-suggestions-item" key={userToFollow._id}>
      <div className="user-follow-suggestions-avatar">
        <DefaultUserAvatar height="2.5rem" width="2.5rem" />
      </div>
      <div className="user-follow-suggestions-body">
        <span>
          <p>{userToFollow && userToFollow.fullname}</p>
          <p>
            <NavLink
              to={`/profile/${userToFollow._id}`}
              className="user-profile-link"
            >
              <strong>@{userToFollow && userToFollow.username}</strong>
            </NavLink>
          </p>
        </span>
        {user && user.following && user.following.includes(userToFollow._id) ? (
          <button
            onClick={() => handleUnfollowBtnClick(userToFollow._id)}
            className="user-follow-suggestions-follow-btn"
          >
            Unfollow
          </button>
        ) : (
          <button
            onClick={() => handleFollowUserBtnClick(userToFollow._id)}
            className="user-follow-suggestions-follow-btn"
          >
            Follow
          </button>
        )}
      </div>
    </div>
  );
};

export default SideBarSuggestionUser;
