import React, { useState, useEffect, use } from "react";
import RecentPost from "./RecentPost";
import { formatDistanceToNow } from "date-fns";

const RecentPostsAll = ({ onPostSelect, cachedPosts, setCachedposts }) => {
  const [posts, setPosts] = useState(cachedPosts, []);
  const [loading, setLoading] = useState(true);

  const handlePostClick = (postId) => {
    onPostSelect(postId);
  };

  useEffect(() => {
    if (cachedPosts) {
      setLoading(false);
    }
    if (!cachedPosts) {
      const fetchPosts = async () => {
        try {
          const response = await fetch(
            "http://localhost:3000/public/sortQuestions?order=asc&sort=createdAt&limit=10"
          );
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

  return (
    <>
      <div
        className="card rounded-3 scroll-container"
        style={{
          marginTop: "2rem",
          padding: "1rem",
          backgroundColor: "rgb(244 244 244 / 0.01)",
          width: "18rem",
        }}
      >
        <h5
          style={{
            width: "12rem",
            display: "flex",
            color: "rgb(96, 103, 109)",
          }}
        >
          Recent posts
        </h5>
        <div>
          {loading ? (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            posts?.length > 0 && (
              <div>
                {posts.map((post) => {
                  return (
                    <RecentPost
                      key={post._id}
                      onClick={() => {
                        handlePostClick(post._id);
                      }}
                      subplace={post.subplace.name}
                      username={post.userid.name}
                      questiontitle={post.title}
                      time={formatDistanceToNow(new Date(post.createdAt), {
                        addSuffix: true,
                      })}
                    />
                  );
                })}
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default RecentPostsAll;
