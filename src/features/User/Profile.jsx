import Header from "../../components/Header";
import CreatePostModal from "../../components/CreatePostModal";
import SideNavBar from "../../components/SideNavBar";
import SideBarSuggestions from "../../components/SideBarSuggestions";
import UserInfo from "./UserInfo";
import Posts from "./Posts";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { fetchUserPosts } from "./userSlice";

import "./Profile.css";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openCreatePostModal, setOpenCreatePostModal] = useState(false);

  const { user, post } = useSelector((state) => state.user);

  const handleCloseCreatePostModal = () => {
    setOpenCreatePostModal(false);
  };

  useEffect(() => {
    dispatch(fetchUserPosts({ userId: user._id }));
  }, [post]);

  useEffect(() => {
    if (!user) {
      navigate("/login", { state: { message: "Please login first!" } });
    }
  }, [user]);

  return (
    <>
      <CreatePostModal
        openModal={openCreatePostModal}
        closeCreatePostModalHandler={handleCloseCreatePostModal}
      />
      <Header />
      <main className="profile-main">
        <SideNavBar
          highlight={"Profile"}
          openModalHandler={setOpenCreatePostModal}
        />
        <section className="user-info-container">
          <UserInfo user={user} />
          <Posts />
        </section>
        <SideBarSuggestions />
      </main>
    </>
  );
};

export default Profile;
