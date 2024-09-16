import { useSelector } from "react-redux";

import PostCard from "./PostCard";

import "./Posts.css";

const Posts = () => {
  const { posts, postsLoading, postsError } = useSelector(
    (state) => state.user
  );

  return (
    <>
      <div className="user-posts-main">
        <h2>Your Posts</h2>
        {!posts && postsLoading === "loading" && (
          <h3 className="loading-text">Loading Posts...</h3>
        )}
        {posts && posts.length > 0 && (
          <div>
            {posts.map((post) => {
              return <PostCard key={post._id} post={post} />;
            })}
          </div>
        )}
        {postsError && <h3>{postsError}</h3>}
      </div>
    </>
  );
};

export default Posts;
