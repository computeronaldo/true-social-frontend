import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE_URL = "https://true-social-backend.vercel.app";

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async ({ pageNumber }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/posts?page=${pageNumber}&limit=10`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const likeUserPost = createAsyncThunk(
  "posts/likeUserPost",
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

export const unlikeUserPost = createAsyncThunk(
  "posts/unlikeUserPost",
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

export const fetchPost = createAsyncThunk(
  "posts/fetchPost",
  async ({ postId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/posts/${postId}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response);
      }
      throw error;
    }
  }
);

export const postComment = createAsyncThunk(
  "posts/postComment",
  async ({ postId, userId, text }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/posts/${postId}/comment`, {
        userId,
        text,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response);
      }
      throw error;
    }
  }
);

export const fetchPostComments = createAsyncThunk(
  "posts/fetchPostComments",
  async ({ postId }) => {
    try {
      const response = await axios.get(`${BASE_URL}/posts/${postId}/comments`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const likeComment = createAsyncThunk(
  "posts/likeComment",
  async ({ commentId, userId }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/comment/${commentId}/like`,
        { userId }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const unlikeComment = createAsyncThunk(
  "posts/unlikeComment",
  async ({ commentId, userId }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/comment/${commentId}/unlike`,
        { userId }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const postsSlice = createSlice({
  name: "Posts",
  initialState: {
    postsInfo: null,
    postsLoading: "idle",
    postsError: null,
    post: null,
    postLoading: "idle",
    postError: null,
    postedComment: null,
    postedCommentLoading: "idle",
    postedCommentError: null,
    postComments: null,
    postCommentsLoading: "idle",
    postCommentsError: null,
    likedComment: null,
    likedCommentLoading: "idle",
    likedCommentError: null,
    unlikedComment: null,
    unlikedCommentLoading: "idle",
    unlikedCommentError: null,
  },
  reducers: {
    resetPostComment: (state, _action) => {
      state.postedComment = null;
      state.postedCommentLoading = "idle";
      state.postedCommentError = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.postsInfo = action.payload;
      state.postsLoading = "idle";
      state.postsError = null;
    });
    builder.addCase(getPosts.pending, (state, _action) => {
      state.postsLoading = "loading";
      state.postsError = null;
    });
    builder.addCase(getPosts.rejected, (state, _action) => {
      state.postsLoading = "idle";
      state.postsError = "Failed to fetch posts!!";
    });
    builder.addCase(likeUserPost.fulfilled, (state, action) => {
      const likedPost = action.payload.post;
      if (state.postsInfo !== null) {
        state.postsInfo.posts = state.postsInfo.posts.map((post) => {
          if (post._id === likedPost._id) {
            return likedPost;
          }
          return post;
        });
      }
      if (state.post !== null)
        state.post = likedPost._id === state.post._id && likedPost;
    });
    builder.addCase(unlikeUserPost.fulfilled, (state, action) => {
      const unlikedPost = action.payload.post;
      if (state.postsInfo != null) {
        state.postsInfo.posts = state.postsInfo.posts.map((post) => {
          if (post._id === unlikedPost._id) {
            return unlikedPost;
          }
          return post;
        });
      }
      if (state.post !== null)
        state.post = unlikedPost._id === state.post._id && unlikedPost;
    });
    builder.addCase(fetchPost.fulfilled, (state, action) => {
      state.post = action.payload.post;
      state.postLoading = "idle";
      state.postError = null;
    });
    builder.addCase(fetchPost.pending, (state, _action) => {
      state.postLoading = "loading";
      state.postError = null;
    });
    builder.addCase(fetchPost.rejected, (state, _action) => {
      state.postError = "Failed to fetch posts";
      state.postLoading = "idle";
    });
    builder.addCase(postComment.fulfilled, (state, action) => {
      state.postedComment = action.payload.data;
      state.postedCommentLoading = "idle";
      state.postedCommentError = null;
    });
    builder.addCase(postComment.pending, (state, _action) => {
      state.postedCommentLoading = "loading";
      state.postedCommentError = null;
    });
    builder.addCase(postComment.rejected, (state, action) => {
      state.postedCommentLoading = "idle";
      state.postedCommentError = action.payload
        ? action.payload.data.error
        : "Couldn't post comment something went wrong!!";
    });
    builder.addCase(fetchPostComments.fulfilled, (state, action) => {
      state.postComments = action.payload.comments;
      state.postCommentsLoading = "idle";
      state.postCommentsError = null;
    });
    builder.addCase(fetchPostComments.pending, (state, _action) => {
      state.postCommentsLoading = "loading";
      state.postCommentsError = null;
    });
    builder.addCase(fetchPostComments.rejected, (state, _action) => {
      state.postCommentsLoading = "idle";
      state.postCommentsError = "Failed to fetch comments.";
    });
    builder.addCase(likeComment.fulfilled, (state, action) => {
      state.likedComment = action.payload.comment;
      state.postComments = state.postComments.map((comment) => {
        if (comment._id === state.likedComment._id) {
          return state.likedComment;
        } else {
          return comment;
        }
      });
      state.likedCommentLoading = "idle";
      state.likedCommentError = null;
    });
    builder.addCase(likeComment.rejected, (state, _action) => {
      state.likedComment = null;
      state.likedCommentLoading = "idle";
      state.likedCommentError = "Failed to like the comment.";
    });
    builder.addCase(unlikeComment.fulfilled, (state, action) => {
      state.unlikedComment = action.payload.comment;
      state.postComments = state.postComments.map((comment) => {
        if (comment._id === state.unlikedComment._id) {
          return state.unlikedComment;
        } else {
          return comment;
        }
      });
      state.unlikedCommentLoading = "idle";
      state.unlikedCommentError = null;
    });
    builder.addCase(unlikeComment.rejected, (state, _action) => {
      state.unlikedComment = null;
      state.unlikedCommentLoading = "idle";
      state.unlikedCommentError = "Failed to unlike comment.";
    });
  },
});
export const { resetPostComment } = postsSlice.actions;
export default postsSlice.reducer;
