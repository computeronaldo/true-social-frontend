import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUserFeed, fetchUserFollowSuggestions } from "./userSlice";

import Header from "../../components/Header";
import SideNavBar from "../../components/SideNavBar";
import SideBarSuggestions from "../../components/SideBarSuggestions";
import CreatePostModal from "../../components/CreatePostModal";
import PostCardUserFeed from "./PostCardUserFeed";

import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();

  const { user, userFeed, userFeedLoading, userFeedError } = useSelector(
    (state) => state.user
  );

  const [openPostModal, setOpenPostModal] = useState(false);

  const closePostModalHandler = () => {
    setOpenPostModal(false);
  };

  useEffect(() => {
    dispatch(fetchUserFeed({ userId: user._id }));
    dispatch(fetchUserFollowSuggestions({ userId: user._id }));
  }, []);

  return (
    <>
      <CreatePostModal
        openModal={openPostModal}
        closeCreatePostModalHandler={closePostModalHandler}
      />
      <Header />
      <main className="home-main">
        <SideNavBar highlight="Home" openModalHandler={setOpenPostModal} />
        <section className="user-feed-container">
          <h2>Latest Posts</h2>
          <div className="user-feed">
            {userFeedLoading === "loading" && (
              <h3 className="user-feed-loading-message">Loading feed...</h3>
            )}
            {userFeedLoading === "idle" && userFeedError && (
              <h3>{userFeedError}</h3>
            )}
            {userFeedLoading === "idle" &&
              !userFeedError &&
              userFeed &&
              userFeed.map((post) => {
                return <PostCardUserFeed key={post._id} post={post} />;
              })}
            {userFeedLoading === "idle" &&
              !userFeedError &&
              userFeed &&
              userFeed.length === 0 && (
                <h3>
                  Follow someone you get your feed filled with posts for your
                  interest!!
                </h3>
              )}
          </div>
        </section>
        <SideBarSuggestions />
      </main>
    </>
  );
};

export default Home;
