import { useSelector } from "react-redux";
import "./SideBarSuggestions.css";
import { NavLink } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";

import "./SideBarSuggestions.css";
import SideBarSuggestionUser from "./SideBarSuggestionUser";

const SideBarSuggestions = () => {
  const { usersToFollow, usersToFollowLoading, usersToFollowError } =
    useSelector((state) => state.user);

  if (!usersToFollow) {
    return (
      <>
        <h3 className="user-follow-suggestions-error">No users to follow!</h3>
      </>
    );
  }

  return (
    <>
      <aside>
        {usersToFollowLoading === "loading" && (
          <h4 className="loading-message">Loading...</h4>
        )}
        {usersToFollowError && (
          <h4 className="user-follow-suggestions-error">
            {usersToFollowError}
          </h4>
        )}
        {usersToFollowLoading === "idle" && usersToFollow && (
          <div className="user-follow-suggestions">
            <div className="user-follow-suggestions-search-bar">
              <IoIosSearch size={20} />
              <input
                className="search-input"
                type="text"
                placeholder="Search Posts, People or Anything"
              />
            </div>
            <div className="user-follow-suggestions-main">
              <div className="user-follow-suggestions-head">
                <h4>Who to Follow?</h4>
                <NavLink className="user-follow-suggestions-show-more-link">
                  Show More
                </NavLink>
              </div>
              <div className="user-follow-suggestions-container">
                {usersToFollow.map((userToFollow) => {
                  return (
                    <SideBarSuggestionUser
                      key={userToFollow.id}
                      userToFollow={userToFollow}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default SideBarSuggestions;
