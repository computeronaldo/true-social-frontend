import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { LuDot } from "react-icons/lu";
import calculateTimestamp from "../../utils/postTimestampCalculator";
import DefaultUserAvatar from "../../components/DefaultUserAvatar";
import "./Comment.css";

import { likeComment, unlikeComment } from "./postsSlice";

import { IoShareSocialOutline } from "react-icons/io5";
import { FaRegHeart, FaHeart } from "react-icons/fa";

const Comment = ({ comment, post }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const postedTime = calculateTimestamp(comment.createdAt);

  const userLikedComment = user && comment.likedBy.includes(user._id);

  const handleLikeComment = () => {
    dispatch(likeComment({ commentId: comment._id, userId: user._id }));
  };

  const handleUnlikeComment = () => {
    dispatch(unlikeComment({ commentId: comment._id, userId: user._id }));
  };

  return (
    <>
      <div className="comment-container">
        <DefaultUserAvatar width="2.5rem" height="2.5rem" />
        <div className="comment-body">
          <div className="comment-body-head">
            <div className="comment-body-head-inner">
              <div>
                <strong>{comment.commentBy.fullname}</strong>
                {"   "}
                <NavLink
                  to={
                    comment.commentBy._id === user._id
                      ? "/profile"
                      : `/profile/${comment.commentBy._id}`
                  }
                  className="user-profile-link"
                >
                  <span>@{comment.commentBy.username}</span>
                </NavLink>
              </div>
              <span className="comment-post-time">
                <LuDot size={20} />
                {postedTime}
              </span>
            </div>
            <div>
              Replying to{" "}
              <strong className="replying-to-user">
                <NavLink
                  to={
                    post.postedBy._id === user._id
                      ? "/profile"
                      : `/profile/${post.postedBy._id}`
                  }
                  className="user-profile-link"
                >
                  @{post && post.postedBy && post.postedBy.username}
                </NavLink>
              </strong>
            </div>
          </div>
          <div className="comment-body-text">{comment.text}</div>
          <div className="comment-user-actions-container">
            <div className="comment-user-actions-like">
              {userLikedComment ? (
                <FaHeart fill="red" onClick={() => handleUnlikeComment()} />
              ) : (
                <FaRegHeart onClick={() => handleLikeComment()} />
              )}{" "}
              <span>{comment.likedBy.length}</span>
            </div>
            <IoShareSocialOutline />
          </div>
        </div>
      </div>
      <hr className="post-details-section-divider" />
    </>
  );
};

export default Comment;
