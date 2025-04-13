import React, { use, useState, useEffect } from "react";
import Post from "../components/homePage/newsFeed/Post";
import { is } from "date-fns/locale";
import PostBackButton from "../components/PostPage/PostBackButton";
import { formatDistanceToNow } from "date-fns";

const Postpage = ({ postId, onBack, cachedSubplaces, setcachedSubplaces }) => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/public/questions/${postId}`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching posts:", error.mesage);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [postId]);

  return (
    <>
      <div>
        <div>
          {loading ? (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            post &&
            post.subplace &&
            post.userid && (
              <div>
                <Post
                  key={post._id}
                  subplace={post.subplace.name}
                  username={post.userid.name}
                  time={formatDistanceToNow(new Date(post.createdAt), {
                    addSuffix: true,
                  })}
                  tags={post.tags}
                  questiontitle={post.title}
                  questionbody={post.body}
                  upvotes={post.upvotes}
                  answers={post.answers}
                />
                <div className="" style={{ display: "flex" }}>
                  <PostBackButton onBack={onBack} />
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Postpage;
