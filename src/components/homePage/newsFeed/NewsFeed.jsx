import React, { use, useState, useEffect } from "react";
import Post from "./Post";
import { formatDistanceToNow } from "date-fns";

const NewsFeed = ({ onPostSelect }) => {
  const [cachedPosts, setCachedposts] = useState(null);
  const [posts, setPosts] = useState(cachedPosts || []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cachedPosts) {
      setLoading(false);
    }
    if (!cachedPosts) {
      const fetchPosts = async () => {
        try {
          const response = await fetch("http://localhost:3000/public/feed");
          const data = await response.json();
          setPosts(data);
          setCachedposts(data);
        } catch (error) {
          console.error("Error fetching posts:", error.mesage);
        } finally {
          setLoading(false);
        }
      };

      fetchPosts();
    }
  }, [cachedPosts, setCachedposts]);

  const handlePostUpdate = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((p) => (p._id === updatedPost._id ? updatedPost : p))
    );
    setCachedposts((prevPosts) =>
      prevPosts.map((p) => (p._id === updatedPost._id ? updatedPost : p))
    );
  };

  return (
    <>
      <div>
        {loading ? (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          posts.length > 0 && (
            <div>
              {posts.map((post) => {
                return (
                  <Post
                    key={post._id}
                    postId={post._id}
                    subplace={post.subplace?.name}
                    username={post.userid?.name}
                    time={formatDistanceToNow(new Date(post.createdAt), {
                      addSuffix: true,
                    })}
                    tags={post.tags}
                    questiontitle={post.title}
                    questionbody={post.body}
                    upvotes={post.upvotes}
                    onPostUpdated={handlePostUpdate}
                  />
                );
              })}
            </div>
          )
        )}
      </div>
    </>
  );
};

export default NewsFeed;
