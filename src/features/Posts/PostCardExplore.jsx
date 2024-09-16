import calculateTimestamp from "../../utils/postTimestampCalculator";
import DefaultUserAvatar from "../../components/DefaultUserAvatar";
import "./PostCardExplore.css";
import { LuDot } from "react-icons/lu";
import { FaRegBookmark, FaRegHeart, FaHeart, FaBookmark } from "react-icons/fa";
import { FaRegCommentAlt } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";

import { bookmarkPost, unbookmarkPost } from "../../features/User/userSlice";
import { likeUserPost, unlikeUserPost } from "./postsSlice";
import { useNavigate, NavLink } from "react-router-dom";

const PostCardExplore = ({ post }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  const likedPost = post.likedBy.includes(user._id);
  const bookmarkedPost = user.bookmarkedPosts.includes(post._id);

  const postTime = calculateTimestamp(post.createdAt);

  const handleBookmarkPost = ({ postId, userId }) => {
    dispatch(bookmarkPost({ postId, userId }));
  };

  const handleUnbookmarkPost = ({ postId, userId }) => {
    dispatch(unbookmarkPost({ postId, userId }));
  };

  const handleCommentBtnClick = () => {
    navigate(`/post/${post._id}`);
  };

  return (
    <>
      <div className="post-card-explore-container">
        <div className="post-card-explore-head">
          <div className="post-card-explore-avatar">
            <DefaultUserAvatar width="3.5rem" height="3.5rem" />
          </div>
        </div>
        <div className="post-card-explore-body">
          <div className="post-card-explore-body-head">
            <div className="post-card-explore-body-head-inner">
              <p>
                <strong>{post.postedBy.fullname}</strong>
              </p>
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
            <div className="post-time">
              <LuDot />
              {postTime}
            </div>
          </div>
          <div className="post-card-explore-body-body post-text">
            <p>{post.postText}</p>
          </div>
          {post.postImage && (
            <div className="post-card-explore-body-img post-image">
              <img
                src={post.postImage}
                className={post.postImage ? "post-image-boundary" : ""}
                alt="Media file has been deleted"
              />
            </div>
          )}
          <div className="post-card-explore-body-options">
            <div className="post-card-explore-like-option">
              {likedPost ? (
                <FaHeart
                  size={20}
                  onClick={() =>
                    dispatch(
                      unlikeUserPost({ userId: user._id, postId: post._id })
                    )
                  }
                  fill="red"
                />
              ) : (
                <FaRegHeart
                  onClick={() =>
                    dispatch(
                      likeUserPost({ userId: user._id, postId: post._id })
                    )
                  }
                  size={20}
                />
              )}
              {post.likedBy.length}
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

export default PostCardExplore;
