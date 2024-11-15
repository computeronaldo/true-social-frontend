import calculateTimestamp from "../../utils/postTimestampCalculator";
import DefaultUserAvatar from "../../components/DefaultUserAvatar";

import { useSelector, useDispatch } from "react-redux";

import {
  deleteUserPost,
  setDeletionPostId,
  likePost,
  unlikePost,
} from "./userSlice";

import { LuDot } from "react-icons/lu";
import { FaRegCommentAlt } from "react-icons/fa";
import { IoOptionsOutline, IoShareSocialOutline } from "react-icons/io5";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import "./PostCard.css";
import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import EditPostModal from "../../components/EditPostModal";

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, deletePostLoading, deletePostError, deletionPostId } =
    useSelector((state) => state.user);

  const [postOptions, setPostOptions] = useState(false);
  const [openEditPostModal, setOpenEditPostModal] = useState(false);

  const postTimestamp = post && calculateTimestamp(post.createdAt);

  const userLikedPost = post && post.likedBy && post.likedBy.includes(user._id);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  const handleUserPostOptionsToogle = () => {
    setPostOptions((prev) => !prev);
  };

  const handleEditPostBtnClick = () => {
    setOpenEditPostModal(true);
  };

  const handleEditPostCloseBtnClick = () => {
    setPostOptions(false);
    setOpenEditPostModal(false);
  };

  const handleDeletePostBtnClick = () => {
    if (user && post) {
      dispatch(setDeletionPostId({ postId: post._id }));
      dispatch(deleteUserPost({ userId: user._id, postId: post._id }));
    }
    setPostOptions(false);
  };

  const handlePostLike = () => {
    if (post && user) {
      dispatch(likePost({ postId: post._id, userId: user._id }));
    }
  };

  const handlePostUnlike = () => {
    if (post && user) {
      dispatch(unlikePost({ postId: post._id, userId: user._id }));
    }
  };

  const handleCommentBtnClick = () => {
    if (post) {
      navigate(`/post/${post._id}`);
    }
  };

  return (
    <>
      <EditPostModal
        post={post}
        openEditPostModal={openEditPostModal}
        closeEditPostModal={handleEditPostCloseBtnClick}
      />
      <div className="post-main">
        <div className="post-container">
          <div className="post-user-avatar">
            <DefaultUserAvatar
              className="post-user-avatar"
              width="2.5rem"
              height="2.5rem"
            />
          </div>
          <div className="post-info-container">
            <div className="post-user-info">
              <div className="post-user-info-names">
                <p>
                  <strong>{user && user.fullname}</strong>
                </p>
                <NavLink to="/profile" className="user-profile-link">
                  <p>@{user && user.username}</p>
                </NavLink>
              </div>
              <span className="post-user-timestamp">
                <LuDot />
                {postTimestamp}
              </span>
            </div>
            <div className="post-text">
              <p>{post && post.postText}</p>
              {post && post.postImage && (
                <div className="post-image">
                  <img
                    className={post.postImage ? "post-image-boundary" : ""}
                    src={post.postImage}
                    alt="Media file has been deleted."
                  />
                </div>
              )}
            </div>
            <div className="post-user-options">
              <span className="post-user-likes">
                {userLikedPost ? (
                  <FaHeart
                    className="liked"
                    size={20}
                    onClick={handlePostUnlike}
                  />
                ) : (
                  <FaRegHeart size={20} onClick={handlePostLike} />
                )}
                {post && post.likedBy && post.likedBy.length}
              </span>
              <FaRegCommentAlt size={20} onClick={handleCommentBtnClick} />
              <IoShareSocialOutline size={20} />
              <div className="post-edit-user-options">
                <IoOptionsOutline
                  size={20}
                  onClick={handleUserPostOptionsToogle}
                />
                {postOptions && (
                  <div className="post-user-options-box">
                    <button onClick={handleEditPostBtnClick}>Edit Post</button>
                    <button onClick={handleDeletePostBtnClick}>
                      Delete Post
                    </button>
                  </div>
                )}
              </div>
            </div>
            {post &&
              post._id === deletionPostId &&
              deletePostLoading === "loading" && (
                <h3 className="loading-text">Deleting...</h3>
              )}
            {post && post._id === deletionPostId && deletePostError && (
              <h3>{deletePostError}</h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;
