import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "https://true-social-backend.vercel.app";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ userInfo }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/signup`, userInfo);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const setNewPassword = createAsyncThunk(
  "user/setNewPassword",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/password`, {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const uploadUserPost = createAsyncThunk(
  "user/uploadPost",
  async (postInfo, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("postedBy", postInfo.postedBy);
      formData.append("postText", postInfo.postText);
      formData.append("postCategory", postInfo.postCategory);
      formData.append("postMedia", postInfo.postMedia);

      const response = await axios.post(`${BASE_URL}/posts`, formData);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const editUserProfile = createAsyncThunk(
  "user/editProfile",
  async (data, { rejectWithValue }) => {
    const body = { ...data };
    const userId = data["userId"];

    delete body["userId"];

    try {
      const response = await axios.post(`${BASE_URL}/users/${userId}`, body);
      return response.data;
    } catch (error) {
      console.log(error);
      if (error.response) {
        return rejectWithValue(error.response);
      }
      throw error;
    }
  }
);

export const usernameAvailability = createAsyncThunk(
  "user/usernameAvailability",
  async ({ username }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/users/check-username?username=${username}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchUserPosts = createAsyncThunk(
  "user/getPosts",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/${userId}/posts`);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response);
      }
      console.log(error);
      throw error;
    }
  }
);

export const editUserPost = createAsyncThunk(
  "user/editPost",
  async ({ userId, postId, postText }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/users/${userId}/posts/${postId}`,
        { postText }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response);
      }
      throw error;
    }
  }
);

export const deleteUserPost = createAsyncThunk(
  "user/deletePost",
  async ({ userId, postId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/users/${userId}/posts/${postId}`
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response);
      }
      throw error;
    }
  }
);

export const likePost = createAsyncThunk(
  "user/likePost",
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

export const unlikePost = createAsyncThunk(
  "user/unlikePost",
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

export const fetchUserFollowSuggestions = createAsyncThunk(
  "user/fetchUserFollowSuggestions",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/users/${userId}/follow-suggestions`
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response);
      }
      throw error;
    }
  }
);

export const followUser = createAsyncThunk(
  "user/followUser",
  async ({ toFollowUserId, userId }) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/${userId}/follow`, {
        followId: toFollowUserId,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const unFollowUser = createAsyncThunk(
  "user/unFollowUser",
  async ({ toUnFollowUserId, userId }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/users/${userId}/unfollow`,
        {
          unfollowId: toUnFollowUserId,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const bookmarkPost = createAsyncThunk(
  "user/bookmarkPost",
  async ({ postId, userId }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/users/${userId}/bookmark/${postId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const unbookmarkPost = createAsyncThunk(
  "user/unbookmarkPost",
  async ({ postId, userId }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/users/${userId}/unbookmark/${postId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchBookmarkedPosts = createAsyncThunk(
  "user/fetchBookmarkedPosts",
  async ({ userId }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/users/${userId}/bookmarked-posts`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchUserFeed = createAsyncThunk(
  "user/fetchUserFeed",
  async ({ userId }) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/${userId}/feed`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: "User",
  initialState: {
    user: null,
    registerError: null,
    registerLoading: "idle",
    usernameAvailable: null,
    usernameAvailableLoading: "idle",
    usernameAvailableError: null,
    loginLoading: "idle",
    loginError: null,
    setNewPasswordLoading: "idle",
    setNewPasswordError: null,
    post: null,
    postUploadLoading: "idle",
    postUploadError: null,
    editUserProfileField: "",
    editUserProfileMessage: "",
    editUserProfileLoading: "idle",
    editUserProfileError: null,
    posts: null,
    postsLoading: "idle",
    postsError: null,
    editPostLoading: "idle",
    editPostError: null,
    editPostMessage: "",
    deletionPostId: null,
    deletePostLoading: "idle",
    deletePostError: null,
    usersToFollow: null,
    usersToFollowLoading: "idle",
    usersToFollowError: null,
    followUserLoading: "idle",
    followUserError: null,
    unFollowUserLoading: "idle",
    unFollowUserError: null,
    bookmarkedPosts: null,
    bookmarkedPostsLoading: "idle",
    bookmarkedPostsError: null,
    userFeed: null,
    userFeedLoading: "idle",
    userFeedError: null,
  },
  reducers: {
    resetUserRegistration: (state, _action) => {
      state.registerLoading = "idle";
      state.registerError = null;
    },
    resetPostModal: (state, _action) => {
      state.post = null;
      state.postUploadLoading = "idle";
      state.postUploadError = null;
    },
    resetEditProfileModal: (state, _action) => {
      state.editUserProfileError = null;
      state.editUserProfileLoading = "idle";
      state.editUserProfileMessage = "";
    },
    setProfileUpdationField: (state, action) => {
      state.editUserProfileField = action.payload.field;
    },
    resetEditPostModal: (state, _action) => {
      state.editPostMessage = "";
      state.editPostLoading = "idle";
      state.editPostError = null;
    },
    setDeletionPostId: (state, action) => {
      state.deletionPostId = action.payload.postId;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.registerLoading = "idle";
      state.registerError = null;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.user = null;
      state.registerLoading = "idle";
      state.registerError = action.payload.error;
    });
    builder.addCase(registerUser.pending, (state, _action) => {
      state.user = null;
      state.registerLoading = "loading";
      state.registerError = null;
    });
    builder.addCase(usernameAvailability.fulfilled, (state, action) => {
      state.usernameAvailable = action.payload;
      state.usernameAvailableLoading = "idle";
      state.usernameAvailableError = null;
    });
    builder.addCase(usernameAvailability.rejected, (state, action) => {
      state.usernameAvailable = null;
      state.usernameAvailableLoading = "idle";
      state.usernameAvailableError = action.payload;
    });
    builder.addCase(usernameAvailability.pending, (state, _action) => {
      state.usernameAvailable = null;
      state.usernameAvailableError = null;
      state.usernameAvailableLoading = "loading";
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.loginLoading = "idle";
      state.loginError = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.user = null;
      state.loginLoading = "idle";
      state.loginError = action.payload.response.data.error;
    });
    builder.addCase(loginUser.pending, (state, _action) => {
      state.user = null;
      state.loginLoading = "loading";
      state.loginError = null;
    });
    builder.addCase(setNewPassword.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.setNewPasswordLoading = "idle";
      state.setNewPasswordError = null;
    });
    builder.addCase(setNewPassword.pending, (state, _action) => {
      state.user = null;
      state.setNewPasswordLoading = "loading";
      state.setNewPasswordError = null;
    });
    builder.addCase(setNewPassword.rejected, (state, action) => {
      state.user = null;
      state.setNewPasswordLoading = "idle";
      state.setNewPasswordError = action.payload.response.data.error;
    });
    builder.addCase(uploadUserPost.fulfilled, (state, action) => {
      state.post = action.payload;
      state.postUploadLoading = "idle";
      state.postUploadError = null;
    });
    builder.addCase(uploadUserPost.rejected, (state, action) => {
      state.post = null;
      state.postUploadLoading = "idle";
      state.postUploadError = action.payload.error;
    });
    builder.addCase(uploadUserPost.pending, (state, _action) => {
      state.post = null;
      state.postUploadLoading = "loading";
      state.postUploadError = null;
    });
    builder.addCase(editUserProfile.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.editUserProfileMessage = "User profile updated successfully!";
      state.editUserProfileLoading = "idle";
      state.editUserProfileError = null;
    });
    builder.addCase(editUserProfile.pending, (state, _action) => {
      state.editUserProfileMessage = "Updating user profile...";
      state.editUserProfileLoading = "loading";
      state.editUserProfileError = null;
    });
    builder.addCase(editUserProfile.rejected, (state, action) => {
      state.editUserProfileMessage = "";
      state.editUserProfileError = action.payload.data.error;
      state.editUserProfileLoading = "idle";
    });
    builder.addCase(fetchUserPosts.fulfilled, (state, action) => {
      state.posts = action.payload.posts;
      state.postsLoading = "idle";
      state.postsError = null;
    });
    builder.addCase(fetchUserPosts.pending, (state, _action) => {
      state.postsLoading = "loading";
      state.postsError = null;
    });
    builder.addCase(fetchUserPosts.rejected, (state, action) => {
      state.postsLoading = "idle";
      state.postsError = action.payload.data.error;
    });
    builder.addCase(editUserPost.fulfilled, (state, action) => {
      const updatedPost = action.payload.post;
      state.posts = state.posts.map((post) => {
        if (post._id === updatedPost._id) {
          return updatedPost;
        } else {
          return post;
        }
      });
      state.editPostLoading = "idle";
      state.editPostError = null;
      state.editPostMessage = "Post edited successfully!";
    });
    builder.addCase(editUserPost.pending, (state, _action) => {
      state.editPostLoading = "loading";
      state.editPostError = null;
      state.editPostMessage = "Making changes...";
    });
    builder.addCase(editUserPost.rejected, (state, action) => {
      state.editPostLoading = "idle";
      state.editPostError = action.payload.data.error;
      state.editPostMessage = "";
    });
    builder.addCase(deleteUserPost.fulfilled, (state, action) => {
      const deletedPost = action.payload.post;
      state.posts = state.posts.filter((post) => post._id !== deletedPost._id);
      state.deletePostLoading = "idle";
      state.deletePostError = null;
      state.deletionPostId = null;
    });
    builder.addCase(deleteUserPost.pending, (state, _action) => {
      state.deletePostLoading = "loading";
      state.deletePostError = null;
    });
    builder.addCase(deleteUserPost.rejected, (state, action) => {
      state.deletePostLoading = "idle";
      state.deletePostError = action.payload.data.error;
      state.deletionPostId = null;
    });
    builder.addCase(likePost.fulfilled, (state, action) => {
      const likedPost = action.payload.post;
      if (state.posts != null) {
        state.posts = state.posts.map((post) => {
          if (post._id === likedPost._id) {
            return likedPost;
          } else {
            return post;
          }
        });
      }
      if (state.bookmarkedPosts != null) {
        state.bookmarkedPosts = state.bookmarkedPosts?.map((post) => {
          if (post._id === likedPost._id) {
            return likedPost;
          } else {
            return post;
          }
        });
      }
      if (state.userFeed !== null) {
        state.userFeed = state.userFeed?.map((post) => {
          if (post._id === likedPost._id) {
            return likedPost;
          } else {
            return post;
          }
        });
      }
    });
    builder.addCase(unlikePost.fulfilled, (state, action) => {
      const unlikedPost = action.payload.post;
      if (state.posts != null) {
        state.posts = state.posts.map((post) => {
          if (post._id === unlikedPost._id) {
            return unlikedPost;
          } else {
            return post;
          }
        });
      }
      if (state.bookmarkedPosts !== null) {
        state.bookmarkedPosts = state.bookmarkedPosts?.map((post) => {
          if (post._id === unlikedPost._id) {
            return unlikedPost;
          } else {
            return post;
          }
        });
      }
      if (state.userFeed != null) {
        state.userFeed = state.userFeed?.map((post) => {
          if (post._id === unlikedPost._id) {
            return unlikedPost;
          } else {
            return post;
          }
        });
      }
    });
    builder.addCase(fetchUserFollowSuggestions.fulfilled, (state, action) => {
      state.usersToFollow = action.payload.users;
      state.usersToFollowLoading = "idle";
      state.usersToFollowError = null;
    });
    builder.addCase(fetchUserFollowSuggestions.pending, (state, _action) => {
      state.usersToFollowLoading = "loading";
      state.usersToFollowError = null;
    });
    builder.addCase(fetchUserFollowSuggestions.rejected, (state, action) => {
      state.usersToFollowLoading = "idle";
      state.usersToFollowError = action.payload.data.error;
    });
    builder.addCase(followUser.fulfilled, (state, action) => {
      state.followUserLoading = "idle";
      state.followUserError = null;
      state.user = action.payload.user;
    });
    builder.addCase(followUser.pending, (state, _action) => {
      state.followUserLoading = "loading";
      state.followUserError = null;
    });
    builder.addCase(followUser.rejected, (state, _action) => {
      state.followUserLoading = "idle";
      state.followUserError = "Couldn't follow. Something went wrong.";
    });
    builder.addCase(unFollowUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.unFollowUserError = null;
      state.unFollowUserLoading = "idle";
    });
    builder.addCase(unFollowUser.pending, (state, _action) => {
      state.unFollowUserError = null;
      state.unFollowUserLoading = "loading";
    });
    builder.addCase(unFollowUser.rejected, (state, _action) => {
      state.unFollowUserError = "Couldn't unfollow. Something went wrong.";
      state.unFollowUserLoading = "idle";
    });
    builder.addCase(bookmarkPost.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
    builder.addCase(unbookmarkPost.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
    builder.addCase(fetchBookmarkedPosts.fulfilled, (state, action) => {
      state.bookmarkedPosts = action.payload.posts;
      state.bookmarkedPostsLoading = "idle";
      state.bookmarkedPostsError = null;
    });
    builder.addCase(fetchBookmarkedPosts.pending, (state, _action) => {
      state.bookmarkedPostsLoading = "loading";
      state.bookmarkedPostsError = null;
    });
    builder.addCase(fetchBookmarkedPosts.rejected, (state, _action) => {
      state.bookmarkedPostsLoading = "idle";
      state.bookmarkedPostsError = "Error fetching bookmarked posts.";
    });
    builder.addCase(fetchUserFeed.fulfilled, (state, action) => {
      state.userFeed = action.payload.posts;
      state.userFeedLoading = "idle";
      state.userFeedError = null;
    });
    builder.addCase(fetchUserFeed.pending, (state, _action) => {
      state.userFeedLoading = "loading";
      state.userFeedError = null;
    });
    builder.addCase(fetchUserFeed.rejected, (state, _action) => {
      state.userFeedLoading = "idle";
      state.userFeedError = "Error fetching feed.";
    });
  },
});

export const {
  resetUserRegistration,
  resetPostModal,
  resetEditProfileModal,
  setProfileUpdationField,
  resetEditPostModal,
  setDeletionPostId,
} = userSlice.actions;
export default userSlice.reducer;
