import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";

import { resetPostModal, uploadUserPost } from "../features/User/userSlice";

import { CiImageOn } from "react-icons/ci";
import { FaWindowClose } from "react-icons/fa";

import "./CreatePostModal.css";

const CreatePostModal = ({ openModal, closeCreatePostModalHandler }) => {
  const newPostModalRef = useRef(null);
  const imageInputRef = useRef(null);

  const [imagePreviewError, setImagePreviewError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [postText, setPostText] = useState("");
  const [postTextCharacterLimit, setPostTextCharacterLimit] = useState(false);
  const [postMedia, setPostMedia] = useState(null);
  const [postCategory, setPostCategory] = useState("General");

  const dispatch = useDispatch();

  const { user, post, postUploadLoading, postUploadError } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (openModal) {
      openNewPostModal();
    }
  }, [openModal]);

  useEffect(() => {
    if (postText.length > 500) {
      setPostTextCharacterLimit(true);
    } else {
      setPostTextCharacterLimit(false);
    }
  }, [postText]);

  useEffect(() => {
    const reader = new FileReader();

    const handleImagePreview = (res) => {
      setImagePreview(res);
    };

    const handleImagePreviewError = () => {
      setImagePreviewError("Failed to read media. Please try again.");
    };
    if (postMedia) {
      reader.onloadend = () => {
        handleImagePreview(reader.result);
      };
      reader.onerror = () => {
        handleImagePreviewError();
      };

      reader.readAsDataURL(postMedia);
    } else {
      setImagePreview(null);
    }

    return () => {
      reader.onloadend = null;
      reader.onerror = null;
    };
  }, [postMedia]);

  const openNewPostModal = () => {
    setImagePreview(null);
    setImagePreviewError("");
    setPostText("");
    setPostTextCharacterLimit(false);
    setPostMedia(null);
    setPostCategory("General");

    dispatch(resetPostModal());

    newPostModalRef.current.showModal();
  };

  const closeNewPostModal = () => {
    closeCreatePostModalHandler();

    setImagePreview(null);
    setImagePreviewError("");
    setPostText("");
    setPostTextCharacterLimit(false);
    setPostMedia(null);
    setPostCategory("General");

    dispatch(resetPostModal());

    newPostModalRef.current.close();
  };

  const handleIconClick = () => {
    imageInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPostMedia(file);
    }
  };

  const newPostSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(
      uploadUserPost({
        postedBy: user["_id"],
        postText,
        postMedia,
        postCategory,
      })
    );

    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }

    setPostMedia(null);
    setPostText("");
    setPostCategory("General");
  };

  return (
    <>
      <dialog className="create-post-modal-container" ref={newPostModalRef}>
        <div className="create-post-modal-inner-container">
          <div className="create-post-modal-head">
            <FaWindowClose
              className="close-modal-btn"
              onClick={closeNewPostModal}
            />
          </div>
          <form onSubmit={newPostSubmitHandler} encType="multipart/form-data">
            <textarea
              className="create-post-modal-post-text"
              value={postText}
              onChange={(e) => {
                setPostText(e.target.value);
                dispatch(resetPostModal());
              }}
              placeholder="Write a post..."
              rows="10"
              cols="50"
            ></textarea>
            {postUploadError && postUploadError["postText"] && (
              <h4>{postUploadError["postText"]}</h4>
            )}
            {postTextCharacterLimit && (
              <p className="create-post-text-error">Character limit reached.</p>
            )}
            <div className="create-post-modal-media-upload">
              <CiImageOn id="postMedia" onClick={handleIconClick} />
              <label htmlFor="postMedia">
                {postMedia ? `${postMedia.name} selected` : "Upload an image"}
              </label>
              {imagePreviewError && <h4>{imagePreviewError}</h4>}
              {imagePreview && (
                <img
                  className="preview-img"
                  width="30px"
                  height="30px"
                  src={imagePreview}
                  alt="Preview"
                />
              )}
            </div>
            <input
              name="postMedia"
              type="file"
              accept="image/*"
              ref={imageInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <div className="create-post-user-inputs">
              <div>
                <button
                  disabled={postTextCharacterLimit}
                  className="create-post-btn"
                  type="submit"
                >
                  Create Post
                </button>
              </div>
              <div>
                <label htmlFor="postCategoryInput">Category:</label>
                <select
                  className="create-post-category-input"
                  value={postCategory}
                  onChange={(e) => {
                    setPostCategory(e.target.value);
                    dispatch(resetPostModal());
                  }}
                  id="postCategoryInput"
                >
                  <option value="General">General</option>
                  <option value="Technology">Technology</option>
                  <option value="Sports">Sports</option>
                  <option value="News">News</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Health">Health</option>
                  <option value="Education">Education</option>
                  <option value="Travel">Travel</option>
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="Science">Science</option>
                  <option value="Food">Food</option>
                  <option value="Business">Business</option>
                  <option value="Politics">Politics</option>
                  <option value="Art">Art</option>
                  <option value="Music">Music</option>
                  <option value="History">History</option>
                  <option value="Nature">Nature</option>
                </select>
              </div>
            </div>
            {post && postUploadLoading === "idle" && <h3>Posted!!!!!</h3>}
            {!post && postUploadLoading === "loading" && (
              <h4 className="create-post-posting-message">Posting...</h4>
            )}
            {postUploadError && postUploadError["postCategory"] && (
              <h4>{postUploadError["postCategory"]}</h4>
            )}
            {postUploadError &&
              !postUploadError["postText"] &&
              !postUploadError["postCategory"] && <p>{postUploadError}</p>}
          </form>
        </div>
      </dialog>
    </>
  );
};

export default CreatePostModal;
