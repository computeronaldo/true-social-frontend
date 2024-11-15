import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, fetchUserPosts } from "./thirdPersonProfileSlice";
import { followUser } from "../User/userSlice";

import DefaultUserAvatar from "../../components/DefaultUserAvatar";
import SideNavBar from "../../components/SideNavBar";
import SideBarSuggestions from "../../components/SideBarSuggestions";
import Header from "../../components/Header";
import ThirdPersonPostCard from "./ThirdPersonPostCard";
import UnfollowModal from "../../components/UnfollowModal";

import "./ThirdPersonProfile.css";

const ThirdPersonProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { profileId } = useParams();

  const { user } = useSelector((state) => state.user);

  const {
    profile,
    profilePosts,
    profileLoading,
    profileError,
    profilePostsLoading,
    profilePostsError,
  } = useSelector((state) => state.thirdPersonProfile);

  const [openUnFollowModal, setOpenUnFollowModal] = useState(false);

  useEffect(() => {
    if (profileId) {
      dispatch(fetchUserProfile({ profileId }));
    }
  }, [profileId]);

  useEffect(() => {
    if (profileId) {
      dispatch(fetchUserPosts({ profileId }));
    }
  }, [profile]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  const handleFollowUserBtnClick = () => {
    if (user && profile) {
      dispatch(followUser({ toFollowUserId: profile._id, userId: user._id }));
    }
  };

  const handleFollowingUserBtnClick = () => {
    setOpenUnFollowModal(true);
  };

  const closeUnfollowModal = () => {
    setOpenUnFollowModal(false);
  };

  const followsThirdPerson =
    user && profile && user.following && user.following.includes(profile._id);

  return (
    <>
      {openUnFollowModal && (
        <UnfollowModal
          modalOpen={openUnFollowModal}
          closeUnfollowModal={closeUnfollowModal}
        />
      )}
      <Header />
      <main className="third-person-profile-main">
        <SideNavBar />
        <section className="third-person-profile-container">
          {profile && (
            <div className="third-person-user-info">
              <div className="third-person-avatar-container">
                <DefaultUserAvatar />
              </div>
              <div className="third-person-username">
                <h3>{profile.fullname}</h3>
                <p className="third-person-user-info-username">
                  @ {profile.username}
                </p>
              </div>
              {followsThirdPerson && (
                <button
                  onClick={() => handleFollowingUserBtnClick()}
                  className="third-person-following-btn"
                >
                  Following
                </button>
              )}
              {!followsThirdPerson && (
                <button
                  onClick={() => handleFollowUserBtnClick()}
                  className="third-person-follow-btn"
                >
                  Follow
                </button>
              )}
              {profile.bio && <p>{profile.bio}</p>}
              {!profile.bio && <h4>No profile found!</h4>}
              {profile.websiteLink && (
                <a href={profile.websiteLink}>
                  {profile.websiteLink.replace(/^https?:\/\//, "")}
                </a>
              )}
              {!profile.websiteLink && <h4>No website link found!</h4>}
              <div className="third-person-profile-stats">
                <div className="third-perons-profile-stat-item">
                  <strong>
                    {profile.followers && profile.followers.length}
                  </strong>
                  <strong>Followers</strong>
                </div>
                <div className="third-perons-profile-stat-item">
                  <strong>{profilePosts ? profilePosts.length : 0}</strong>
                  <strong>Posts</strong>
                </div>
                <div className="third-perons-profile-stat-item">
                  <strong>
                    {profile.following && profile.following.length}
                  </strong>
                  <strong>Following</strong>
                </div>
              </div>
            </div>
          )}
          {!profile && profileLoading === "loading" && !profileError && (
            <h3 className="post-details-loading-message">
              User profile loading...
            </h3>
          )}
          {!profile && profileLoading === "idle" && profileError && (
            <h3 className="profile-error-message">{profileError}</h3>
          )}
          {profilePosts && profilePosts.length === 0 && (
            <h3 className="no-profile-posts-message">Nothing posted yet!</h3>
          )}
          {profilePosts && profilePosts.length > 0 && (
            <div className="third-person-posts-container">
              <h3>{profile && profile.fullname}'s Posts</h3>
              {profilePosts.map((post) => {
                return <ThirdPersonPostCard post={post} />;
              })}
            </div>
          )}
          {!profilePosts &&
            profilePostsLoading === "loading" &&
            !profilePostsError && (
              <h3 className="post-details-loading-message">
                User posts loading...
              </h3>
            )}
          {!profilePosts &&
            profilePostsLoading === "idle" &&
            profilePostsError && (
              <h3 className="profile-error-message">{profilePostsError}</h3>
            )}
        </section>
        <SideBarSuggestions />
      </main>
    </>
  );
};

export default ThirdPersonProfile;
