import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { unFollowUser } from "../features/User/userSlice";
import "./UnfollowModal.css";

const UnfollowModal = ({ modalOpen, closeUnfollowModal }) => {
  const dispatch = useDispatch();

  const unfollowModal = useRef(null);

  const { user } = useSelector((state) => state.user);
  const { profile } = useSelector((state) => state.thirdPersonProfile);

  const handleUnfollowUser = () => {
    dispatch(unFollowUser({ toUnFollowUserId: profile._id, userId: user._id }));
  };

  useEffect(() => {
    if (user && profile && !user.following.includes(profile._id)) {
      closeUnfollowModal();
    }
  }, [user, profile]);

  useEffect(() => {
    if (modalOpen) {
      unfollowModal.current.showModal();
    } else {
      unfollowModal.current.close();
    }
  }, [modalOpen]);

  return (
    <>
      <dialog className="unfollow-modal-container" ref={unfollowModal}>
        <h4>Are you sure you want to unfollow?</h4>
        <div className="unfollow-modal-box">
          <button
            className="unfollow-modal-btn"
            onClick={() => closeUnfollowModal()}
          >
            Cancel
          </button>
          <button
            className="unfollow-modal-btn"
            onClick={() => handleUnfollowUser()}
          >
            Unfollow
          </button>
        </div>
      </dialog>
    </>
  );
};

export default UnfollowModal;
