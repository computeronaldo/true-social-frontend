import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookmarkedPosts } from "./userSlice";

import SideNavBar from "../../components/SideNavBar";
import Header from "../../components/Header";
import SideBarSuggestions from "../../components/SideBarSuggestions";
import CreatePostModal from "../../components/CreatePostModal";

import "./Bookmark.css";
import PostCardBookmark from "./PostCardBookmark";

const Bookmark = () => {
  const [openPostModal, setOpenPostModal] = useState(false);

  const dispatch = useDispatch();

  const { user, bookmarkedPosts } = useSelector((state) => state.user);

  const closePostModalHandler = () => {
    setOpenPostModal(false);
  };

  useEffect(() => {
    dispatch(fetchBookmarkedPosts({ userId: user._id }));
  }, [user]);

  return (
    <>
      <CreatePostModal
        openModal={openPostModal}
        closeCreatePostModalHandler={closePostModalHandler}
      />
      <Header />
      <main className="bookmark-main">
        <SideNavBar highlight="Bookmark" openModalHandler={setOpenPostModal} />
        <section className="bookmark-container">
          <h2>Your Bookmarks</h2>
          {bookmarkedPosts && bookmarkedPosts.length === 0 && (
            <h4 className="no-bookmarks-message">
              You haven't bookmarked any post yet!
            </h4>
          )}
          <div>
            {bookmarkedPosts &&
              bookmarkedPosts.map((post) => {
                return <PostCardBookmark key={post._id} post={post} />;
              })}
          </div>
        </section>
        <SideBarSuggestions />
      </main>
    </>
  );
};

export default Bookmark;
