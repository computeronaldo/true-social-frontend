import Header from "../../components/Header";
import SideNavBar from "../../components/SideNavBar";
import SideBarSuggestions from "../../components/SideBarSuggestions";
import CreatePostModal from "../../components/CreatePostModal";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

import { getPosts } from "./postsSlice";

import { useDispatch, useSelector } from "react-redux";

import "./Explore.css";
import { useEffect, useState } from "react";
import PostCardExplore from "./PostCardExplore";

const categories = [
  "General",
  "Technology",
  "Sports",
  "News",
  "Lifestyle",
  "Entertainment",
  "Health",
  "Education",
  "Travel",
  "Food",
  "Science",
  "Business",
  "Politics",
  "Art",
  "Music",
  "History",
  "Nature",
  "Remove Filter",
];

const Explore = () => {
  const dispatch = useDispatch();
  const { postsInfo } = useSelector((state) => state.posts);
  const { post } = useSelector((state) => state.user);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [openCreatePostModal, setOpenCreatePostModal] = useState(false);

  useEffect(() => {
    dispatch(getPosts({ pageNumber }));
  }, [pageNumber, post]);

  const handleCloseCreatePostModal = () => {
    setOpenCreatePostModal(false);
  };

  const handleCurrentPageClick = (pageNum) => {
    setPageNumber(pageNum);
  };

  const totalPages = parseInt(postsInfo && postsInfo.totalPages);

  const posts =
    (postsInfo &&
      postsInfo.posts &&
      postsInfo.posts.filter(
        (post) =>
          post.postCategory === selectedCategory || selectedCategory === ""
      )) ||
    [];

  return (
    <>
      <CreatePostModal
        openModal={openCreatePostModal}
        closeCreatePostModalHandler={handleCloseCreatePostModal}
      />
      <Header />
      <main className="explore-main">
        <SideNavBar
          highlight={"Explore"}
          openModalHandler={setOpenCreatePostModal}
        />
        <section className="explore-container">
          <h2 className="explore-container-head">Explore</h2>
          <div className="post-categories-container">
            {categories.map((category, index) => {
              return (
                <div
                  key={index}
                  className={`post-categories-item ${
                    selectedCategory === category &&
                    category !== "Remove Filter"
                      ? "highlight-category"
                      : ""
                  } ${
                    category === "Remove Filter" ? "remove-category-filter" : ""
                  }`}
                  onClick={() =>
                    setSelectedCategory(
                      category === "Remove Filter" ? "" : category
                    )
                  }
                >
                  {category}
                </div>
              );
            })}
          </div>
          <div>
            {posts.length === 0 && (
              <div className="no-posts-category-message">
                <h4>{`No posts belong to ${selectedCategory.toLowerCase()} category.`}</h4>
                <button
                  className="reset-category-btn"
                  onClick={() => setSelectedCategory("")}
                >
                  Remove category filter
                </button>
              </div>
            )}
            {posts.length > 0 &&
              posts.map((post) => {
                return <PostCardExplore key={post._id} post={post} />;
              })}
          </div>
          {pageNumber === 1 && (
            <div className="page-number-container">
              <span
                className="current-page"
                onClick={() => handleCurrentPageClick(pageNumber)}
              >
                {pageNumber}
              </span>
              <span onClick={() => handleCurrentPageClick(pageNumber + 1)}>
                {pageNumber + 1}
              </span>
              <HiOutlineDotsHorizontal size={30} />
            </div>
          )}
          {pageNumber > 1 && pageNumber < totalPages && (
            <div className="page-number-container">
              <HiOutlineDotsHorizontal size={20} />
              <span onClick={() => handleCurrentPageClick(pageNumber - 1)}>
                {pageNumber - 1}
              </span>
              <span
                className="current-page"
                onClick={() => handleCurrentPageClick(pageNumber)}
              >
                {pageNumber}
              </span>
              <span onClick={() => handleCurrentPageClick(pageNumber + 1)}>
                {pageNumber + 1}
              </span>
              <HiOutlineDotsHorizontal size={20} />
            </div>
          )}
          {pageNumber === totalPages && (
            <div className="page-number-container">
              <HiOutlineDotsHorizontal size={20} />
              <span onClick={() => handleCurrentPageClick(pageNumber - 1)}>
                {pageNumber - 1}
              </span>
              <span
                className="current-page"
                onClick={() => handleCurrentPageClick(pageNumber)}
              >
                {pageNumber}
              </span>
            </div>
          )}
        </section>
        <SideBarSuggestions />
      </main>
    </>
  );
};

export default Explore;
