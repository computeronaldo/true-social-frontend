import { useNavigate, useParams, NavLink } from "react-router-dom";

import Header from "../../components/Header";
import SideBarSuggestions from "../../components/SideBarSuggestions";
import SideNavBar from "../../components/SideNavBar";
import CreatePostModal from "../../components/CreatePostModal";
import DefaultUserAvatar from "../../components/DefaultUserAvatar";
import Comment from "./Comment";

import { IoMdArrowBack } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import {
  FaRegHeart,
  FaRegCommentAlt,
  FaRegBookmark,
  FaHeart,
  FaBookmark,
} from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { fetchPost } from "./postsSlice";

import "./PostDetails.css";

import {
  likeUserPost,
  unlikeUserPost,
  postComment,
  resetPostComment,
  fetchPostComments,
} from "./postsSlice";
import { bookmarkPost, unbookmarkPost } from "../User/userSlice";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "Decemeber",
];

const PostDetails = () => {
  const commentInputRef = useRef(null);

  const { postId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [commentInput, setCommentInput] = useState("");

  const {
    post,
    postLoading,
    postError,
    postedComment,
    postedCommentLoading,
    postedCommentError,
    postComments,
    postCommentsLoading,
    postCommentsError,
  } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchPost({ postId }));
  }, [postId]);

  useEffect(() => {
    if (!postedCommentError && postedCommentLoading === "idle") {
      dispatch(fetchPostComments({ postId }));
    }
  }, [postedComment]);

  const postedDate = post && new Date(post.createdAt);

  const options = { hour: "numeric", minute: "numeric", hour12: true };
  const timeString = post && postedDate.toLocaleTimeString("en-US", options);

  const day = post && postedDate.getDay();
  const month = post && postedDate.getMonth();
  const year = post && postedDate.getFullYear();

  const handleLikeBtnClick = () => {
    dispatch(likeUserPost({ userId: user._id, postId: post._id }));
  };

  const handleUnlikeBtnClick = () => {
    dispatch(unlikeUserPost({ userId: user._id, postId: post._id }));
  };

  const handleUnbookmarkPost = () => {
    dispatch(unbookmarkPost({ postId: post._id, userId: user._id }));
  };

  const handleBookmarkPost = () => {
    dispatch(bookmarkPost({ postId: post._id, userId: user._id }));
  };

  const handleCommentBtnClick = () => {
    commentInputRef.current.focus();
  };

  const handleCommentPosting = (e) => {
    e.preventDefault();

    dispatch(
      postComment({ userId: user._id, postId: post._id, text: commentInput })
    );

    setCommentInput("");
  };

  const likedPost =
    user && post && post.likedBy && post.likedBy.includes(user._id);
  const bookmarkedPost =
    post &&
    user &&
    user.bookmarkedPosts &&
    user.bookmarkedPosts.includes(post._id);

  return (
    <>
      <CreatePostModal />
      <Header />
      <main className="post-details-main">
        <SideNavBar />
        <section className="post-details-container">
          <div className="post-details-head">
            <IoMdArrowBack size={25} onClick={() => navigate(-1)} />
            <h1>Post</h1>
          </div>
          <div className="post-details-body">
            {postLoading === "loading" && (
              <h3 className="post-details-loading-message">Loading...</h3>
            )}
            {postError && (
              <h3 className="post-details-error-message">{postError}</h3>
            )}
            {post && postLoading === "idle" && !postError && (
              <>
                <div className="post-details-body-head">
                  <div className="post-details-avatar-container">
                    <DefaultUserAvatar width="3rem" height="3rem" />
                  </div>
                  <div>
                    <strong>{post.postedBy.fullname}</strong>
                    <NavLink
                      to={
                        post.postedBy._id === user._id
                          ? "/profile"
                          : `/profile/${post.postedBy._id}`
                      }
                      className="user-profile-link"
                    >
                      <p>@{post.postedBy.username}</p>
                    </NavLink>
                  </div>
                </div>
                <div className="post-details-post-text">{post.postText}</div>
                <div className="post-details-post-image">
                  <img src={post.postImage} alt="Media file not found." />
                </div>
                <div className="post-details-post-time">
                  {timeString}
                  <div className="post-details-post-time-inner">
                    <GoDotFill size={10} />
                    <span>
                      {months[month]} {day} {year}
                    </span>
                  </div>
                </div>
                <hr className="post-details-section-divider" />
                <span className="post-details-like-count">
                  {post.likedBy.length} Likes
                </span>
                <hr />
                <div className="post-details-user-actions">
                  {likedPost ? (
                    <FaHeart
                      fill="red"
                      onClick={() => handleUnlikeBtnClick()}
                      size={20}
                    />
                  ) : (
                    <FaRegHeart
                      onClick={() => handleLikeBtnClick()}
                      size={20}
                    />
                  )}
                  <FaRegCommentAlt
                    onClick={() => handleCommentBtnClick()}
                    size={20}
                  />
                  <IoShareSocialOutline size={20} />
                  {bookmarkedPost ? (
                    <FaBookmark
                      onClick={() => handleUnbookmarkPost()}
                      size={20}
                    />
                  ) : (
                    <FaRegBookmark
                      onClick={() => handleBookmarkPost()}
                      size={20}
                    />
                  )}
                </div>
              </>
            )}
          </div>
          <hr className="post-details-section-divider" />
          <div className="post-details-write-comment-section">
            <DefaultUserAvatar width="2.5rem" height="2.5rem" />
            <form
              className="post-details-write-comment-form"
              onSubmit={handleCommentPosting}
            >
              <input
                value={commentInput}
                onChange={(e) => {
                  setCommentInput(e.target.value);
                  dispatch(resetPostComment());
                }}
                type="text"
                placeholder="Comment your reply"
                ref={commentInputRef}
              />
              {commentInput.trim().length > 500 && (
                <h3 className="post-comment-error">
                  Comment length can't exceed 500 character limit
                </h3>
              )}
              <button
                className={`post-comment-btn ${
                  commentInput.trim().length > 500 &&
                  "post-comment-btn-disabled"
                }`}
                type="submit"
              >
                Post
              </button>
              {postedCommentError && postedCommentError["text"] && (
                <h3 className="post-comment-error">
                  {postedCommentError["text"]}
                </h3>
              )}
              {postedCommentError && !postedCommentError["text"] && (
                <h3 className="post-comment-error">{postedCommentError}</h3>
              )}
              {postedCommentLoading === "loading" && (
                <h3 className="post-comment-posting post-details-loading-message">
                  Posting...
                </h3>
              )}
            </form>
          </div>
          <hr className="post-details-section-divider" />
          <div className="post-comments-container">
            {postCommentsLoading === "loading" && (
              <h3 className="post-comments-loading post-details-loading-message">
                Loading comments...
              </h3>
            )}
            {postCommentsLoading === "idle" && postCommentsError && (
              <h3 className="post-comments-error">{postCommentsError}</h3>
            )}
            {postCommentsLoading === "idle" &&
              postComments &&
              postComments.length === 0 && (
                <h3 className="post-comments-no-comments-message">
                  No comments on this post yet!
                </h3>
              )}
            {postCommentsLoading === "idle" &&
              postComments &&
              postComments.length > 0 &&
              postComments.map((comment) => {
                return (
                  <Comment key={comment._id} comment={comment} post={post} />
                );
              })}
          </div>
        </section>
        <SideBarSuggestions />
      </main>
    </>
  );
};

export default PostDetails;
