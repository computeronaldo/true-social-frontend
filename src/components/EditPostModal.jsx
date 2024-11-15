import { useEffect, useRef, useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { editUserPost, resetEditPostModal } from "../features/User/userSlice";
import "./EditPostModal.css";

const EditPostModal = ({ post, openEditPostModal, closeEditPostModal }) => {
  const navigate = useNavigate();
  const editPostRef = useRef(null);
  const dispatch = useDispatch();

  const { user, editPostLoading, editPostError, editPostMessage } = useSelector(
    (state) => state.user
  );

  const [postText, setPostText] = useState(post.postText);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    if (openEditPostModal) {
      setPostText(post.postText);
    }
  }, [openEditPostModal]);

  useEffect(() => {
    if (openEditPostModal) {
      editPostRef.current.showModal();
      dispatch(resetEditPostModal());
    } else {
      editPostRef.current.close();
    }
  }, [openEditPostModal]);

  const handleCloseEditPostModal = () => {
    dispatch(resetEditPostModal());
    closeEditPostModal();
  };

  const handleEditPostSubmission = (e) => {
    e.preventDefault();

    if (user) {
      const postData = {
        userId: user._id,
        postId: post._id,
        postText: postText,
      };

      dispatch(editUserPost(postData));
    }

    setPostText("");
  };

  return (
    <>
      <dialog className="edit-post-modal-container" ref={editPostRef}>
        <div className="edit-post-modal-head">
          <h3>Edit Post</h3>
          <FaWindowClose onClick={handleCloseEditPostModal} />
        </div>
        <div className="edit-post-modal-form-container">
          <form
            onSubmit={handleEditPostSubmission}
            className="edit-post-modal-form"
          >
            <textarea
              value={postText}
              rows="10"
              cols="50"
              onChange={(e) => {
                setPostText(e.target.value);
                dispatch(resetEditPostModal());
              }}
            ></textarea>
            <button type="submit">Edit</button>
          </form>
          {editPostLoading === "loading" && (
            <h3 className="edit-post-message edit-post-posting-message">
              {editPostMessage}
            </h3>
          )}
          {editPostError && (
            <h3 className="edit-post-message">{editPostError.postText}</h3>
          )}
          {!editPostError && editPostLoading === "idle" && (
            <h3 className="edit-post-message">{editPostMessage}</h3>
          )}
        </div>
      </dialog>
    </>
  );
};

export default EditPostModal;
