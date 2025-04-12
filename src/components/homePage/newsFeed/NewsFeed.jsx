import React, { use, useState, useEffect } from "react";
import Post from "./Post";
import { formatDistanceToNow } from "date-fns";

const NewsFeed = ({ onPostSelect, cachedPosts, setCachedposts }) => {
  const [posts, setPosts] = useState(cachedPosts || []);

  const handlePostClick = (postId) => {
    onPostSelect(postId);
  };

  useEffect(() => {
    if (!cachedPosts) {
      const fetchPosts = async () => {
        try {
          const response = await fetch("http://localhost:3000/public/feed");
          const data = await response.json();
          setPosts(data);
          setCachedposts(data);
        } catch (error) {
          console.error("Error fetching posts:", error.mesage);
        }
      };

      fetchPosts();
    }
  }, [cachedPosts, setCachedposts]);

  return (
    <>
      <div>
        {posts.map((post) => {
          return (
            <Post
              key={post._id}
              onClick={() => {
                handlePostClick(post._id);
              }}
              subplace={post.subplace.name}
              username={post.userid.name}
              time={formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })}
              tags={post.tags}
              questiontitle={post.title}
              questionbody={post.body}
              upvotes={post.upvotes}
            />
          );
        })}
      </div>
    </>
  );
};

export default NewsFeed;
