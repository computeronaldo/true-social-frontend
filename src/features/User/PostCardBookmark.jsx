import calculateTimestamp from "../../utils/postTimestampCalculator";
import DefaultUserAvatar from "../../components/DefaultUserAvatar";
import "./PostCardBookmark.css";
import { LuDot } from "react-icons/lu";
import { FaRegBookmark, FaRegHeart, FaHeart, FaBookmark } from "react-icons/fa";
import { FaRegCommentAlt } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";

import { bookmarkPost, unbookmarkPost } from "../../features/User/userSlice";
import { likePost, unlikePost } from "./userSlice";
import { useNavigate, NavLink } from "react-router-dom";
import { useEffect } from "react";

const PostCardBookmark = ({ post }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  const likedPost = post && post.likedBy && post.likedBy.includes(user._id);
  const bookmarkedPost =
    user && user.bookmarkedPosts && user.bookmarkedPosts.includes(post._id);

  const postTime = post && calculateTimestamp(post.createdAt);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  const handleBookmarkPost = ({ postId, userId }) => {
    if (post && user) {
      dispatch(bookmarkPost({ postId, userId }));
    }
  };

  const handleUnbookmarkPost = ({ postId, userId }) => {
    if (post && user) {
      dispatch(unbookmarkPost({ postId, userId }));
    }
  };

  const handleCommentBtnClick = () => {
    if (post) {
      navigate(`/post/${post._id}`);
    }
  };

  return (
    <>
      <div className="post-card-bookmark-container">
        <div className="post-card-bookmark-head">
          <div className="post-card-bookmark-avatar">
            <DefaultUserAvatar width="3.5rem" height="3.5rem" />
          </div>
        </div>
        <div className="post-card-bookmark-body">
          <div className="post-card-bookmark-body-head">
            <div className="post-card-bookmark-body-head-inner">
              <p>
                <strong>
                  {post && post.postedBy && post.postedBy.fullname}
                </strong>
              </p>
              <NavLink
                to={
                  post &&
                  user &&
                  post.postedBy &&
                  post.postedBy._id === user._id
                    ? "/profile"
                    : `/profile/${post.postedBy._id}`
                }
                className="user-profile-link"
              >
                <p>@{post && post.postedBy && post.postedBy.username}</p>
              </NavLink>
            </div>
            <div className="post-time">
              <LuDot />
              {postTime}
            </div>
          </div>
          <div className="post-card-bookmark-body-body post-text">
            <p>{post && post.postText}</p>
          </div>
          {post && post.postImage && (
            <div className="post-card-bookmark-body-img post-image">
              <img
                src={post.postImage}
                className={post.postImage ? "post-image-boundary" : ""}
                alt="Media file has been deleted"
              />
            </div>
          )}
          <div className="post-card-bookmark-body-options">
            <div className="post-card-bookmark-like-option">
              {likedPost ? (
                <FaHeart
                  size={20}
                  onClick={() =>
                    dispatch(unlikePost({ userId: user._id, postId: post._id }))
                  }
                  fill="red"
                />
              ) : (
                <FaRegHeart
                  onClick={() =>
                    dispatch(likePost({ userId: user._id, postId: post._id }))
                  }
                  size={20}
                />
              )}
              {post && post.likedBy && post.likedBy.length}
            </div>
            <FaRegCommentAlt size={20} onClick={handleCommentBtnClick} />
            <IoShareSocialOutline size={20} />
            {bookmarkedPost ? (
              <FaBookmark
                onClick={() =>
                  handleUnbookmarkPost({ postId: post._id, userId: user._id })
                }
                size={20}
              />
            ) : (
              <FaRegBookmark
                onClick={() =>
                  handleBookmarkPost({ postId: post._id, userId: user._id })
                }
                size={20}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCardBookmark;
