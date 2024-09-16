import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FaWindowClose } from "react-icons/fa";

import {
  editUserProfile,
  resetEditProfileModal,
  setProfileUpdationField,
} from "./userSlice";

import "./EditProfileModal.css";

const EditProfileModal = ({
  openEditProfileModal,
  handleCloseEditProfileModal,
  field,
}) => {
  const editProfileModal = useRef(null);

  const dispatch = useDispatch();

  const { user, editUserProfileMessage, editUserProfileError } = useSelector(
    (state) => state.user
  );

  const [bioInput, setBioInput] = useState("");
  const [websiteLinkInput, setWebsiteLinkInput] = useState("");

  useEffect(() => {
    setBioInput(user.bio);
    setWebsiteLinkInput(user.websiteLink);
  }, [openEditProfileModal]);

  useEffect(() => {
    if (openEditProfileModal) {
      handleOpenEditProfileModal();
    }
  }, [openEditProfileModal]);

  const handleOpenEditProfileModal = () => {
    editProfileModal.current.showModal();
  };

  const closeEditProfileModal = () => {
    handleCloseEditProfileModal();
    editProfileModal.current.close();
  };

  const handleEditProfileFormSubmission = (e) => {
    e.preventDefault();

    dispatch(setProfileUpdationField(field));

    const data = (function IIFE() {
      if (field === "") {
        return {
          userId: user._id,
          bio: bioInput,
          websiteLink: websiteLinkInput,
        };
      } else if (field === "bio") {
        return {
          userId: user._id,
          bio: bioInput,
        };
      } else if (field === "websiteLink") {
        return {
          userId: user._id,
          websiteLink: websiteLinkInput,
        };
      }
    })();

    dispatch(editUserProfile(data));

    setBioInput("");
    setWebsiteLinkInput("");
  };

  return (
    <>
      <dialog className="edit-profile-modal-container" ref={editProfileModal}>
        <div>
          <div className="edit-profile-modal-head">
            <FaWindowClose
              className="close-modal-btn"
              onClick={closeEditProfileModal}
            />
          </div>
          <form
            onSubmit={handleEditProfileFormSubmission}
            className="edit-profile-form"
          >
            {(field === "" || field === "bio") && (
              <>
                <div className="edit-profile-form-item">
                  <label htmlFor="userBioInput">Bio</label>
                  <textarea
                    required
                    onChange={(e) => {
                      setBioInput(e.target.value);
                      dispatch(resetEditProfileModal());
                    }}
                    value={bioInput}
                    rows="5"
                    cols="50"
                    id="userBioInput"
                  ></textarea>
                  {(field === "" || field === "bio") &&
                    editUserProfileError &&
                    editUserProfileError.bio && (
                      <h5>{editUserProfileError.bio}</h5>
                    )}
                </div>
              </>
            )}
            {(field === "" || field === "websiteLink") && (
              <>
                <div className="edit-profile-form-item">
                  <label htmlFor="websiteLinkInput">Website Link</label>
                  <input
                    onChange={(e) => {
                      setWebsiteLinkInput(e.target.value);
                      dispatch(resetEditProfileModal());
                    }}
                    value={websiteLinkInput}
                    type="url"
                    id="websiteLinkInput"
                  />
                  {(field === "" || field === "websiteLink") &&
                    editUserProfileError &&
                    editUserProfileError.websiteLink && (
                      <h5>{editUserProfileError.websiteLink}</h5>
                    )}
                </div>
              </>
            )}
            <button type="submit" className="edit-profile-btn">
              Update Profile
            </button>
          </form>
          {editUserProfileMessage !== "" && (
            <h4 className="edit-user-profile-message">
              {editUserProfileMessage}
            </h4>
          )}
          {((field === "" && editUserProfileError) ||
            (field === "bio" &&
              editUserProfileError &&
              editUserProfileError.bio) ||
            (field === "websiteLink" &&
              editUserProfileError &&
              editUserProfileError.websiteLink)) && (
            <h4 className="edit-user-profile-message">
              Seems you entered some invalid inputs.
            </h4>
          )}
        </div>
      </dialog>
    </>
  );
};

export default EditProfileModal;
