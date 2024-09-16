import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/User/userSlice";
import postsReducer from "./features/Posts/postsSlice";
import thirdPersonProfileReducer from "./features/ThirdPersonProfile/thirdPersonProfileSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    thirdPersonProfile: thirdPersonProfileReducer,
  },
});

export default store;
