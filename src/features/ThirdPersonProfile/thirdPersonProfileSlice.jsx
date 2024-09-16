import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://true-social-backend.vercel.app";

export const fetchUserProfile = createAsyncThunk(
  "thirdPersonProfile/fetchUserProfile",
  async ({ profileId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/profile/${profileId}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response);
      }
      throw error;
    }
  }
);

export const fetchUserPosts = createAsyncThunk(
  "thirdPersonProfile/fetchUserPosts",
  async ({ profileId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/${profileId}/posts`);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response);
      }
      throw error;
    }
  }
);

export const likeThirdPersonPost = createAsyncThunk(
  "user/likeThirdPersonPost",
  async ({ userId, postId }) => {
    try {
      const response = await axios.post(`${BASE_URL}/posts/${postId}/like`, {
        userId,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const unlikeThirdPersonPost = createAsyncThunk(
  "user/unlikeThirdPersonPost",
  async ({ userId, postId }) => {
    try {
      const response = await axios.post(`${BASE_URL}/posts/${postId}/unlike`, {
        userId,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const thirdPersonProfileSlice = createSlice({
  name: "ThirdPersonProfile",
  initialState: {
    profile: null,
    profileLoading: "idle",
    profileError: null,
    profilePosts: null,
    profilePostsLoading: "idle",
    profilePostsError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.profile = action.payload.profile;
      state.profileLoading = "idle";
      state.profileError = null;
    });
    builder.addCase(fetchUserProfile.pending, (state, _action) => {
      state.profile = null;
      state.profileLoading = "loading";
      state.profileError = null;
    });
    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      state.profile = null;
      state.profileLoading = "idle";
      state.profileError = action.payload
        ? action.payload.data.error
        : "Failed to fetch user profile";
    });
    builder.addCase(fetchUserPosts.fulfilled, (state, action) => {
      state.profilePosts = action.payload.posts;
      state.profilePostsLoading = "idle";
      state.profilePostsError = null;
    });
    builder.addCase(fetchUserPosts.pending, (state, _action) => {
      state.profilePosts = null;
      state.profilePostsLoading = "loading";
      state.profilePostsError = null;
    });
    builder.addCase(fetchUserPosts.rejected, (state, action) => {
      state.profilePosts = null;
      state.profilePostsLoading = "idle";
      state.profilePostsError = action.payload
        ? action.payload.data.error
        : "Failed to fetch user posts";
    });
    builder.addCase(likeThirdPersonPost.fulfilled, (state, action) => {
      const likedPost = action.payload.post;
      if (state.profilePosts) {
        state.profilePosts = state.profilePosts.map((post) => {
          if (post._id === likedPost._id) {
            return likedPost;
          } else {
            return post;
          }
        });
      }
    });
    builder.addCase(unlikeThirdPersonPost.fulfilled, (state, action) => {
      const unlikedPost = action.payload.post;
      if (state.profilePosts) {
        state.profilePosts = state.profilePosts.map((post) => {
          if (post._id === unlikedPost._id) {
            return unlikedPost;
          } else {
            return post;
          }
        });
      }
    });
  },
});

export default thirdPersonProfileSlice.reducer;
