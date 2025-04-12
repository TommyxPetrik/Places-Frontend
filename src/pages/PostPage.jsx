import React, { use, useState, useEffect } from "react";
import Navbar from "../components/homePage/navbar/Navbar";
import SidebarLeft from "../components/homePage/sideBar/SidebarLeft";
import Post from "../components/homePage/newsFeed/Post";
import { is } from "date-fns/locale";
import PostBackButton from "../components/PostPage/PostBackButton";

const Postpage = ({ postId, onBack, cachedSubplaces, setcachedSubplaces }) => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/public/questions/${postId}`
        );
        const data = await response.json();
        setPost(data);
      } catch (error) {
        alert("Error fetching posts:", error.mesage);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [postId]);

  return (
    <>
      <Navbar />
      <SidebarLeft
        cachedSubplaces={cachedSubplaces}
        setcachedSubplaces={setcachedSubplaces}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "2rem",
          padding: "2rem",
        }}
      >
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
                <PostBackButton onBack={onBack} />
                <Post
                  key={post._id}
                  subplace={post.subplace.name}
                  username={post.userid.name}
                  time={post.createdAt}
                  tags={post.tags}
                  questiontitle={post.title}
                  questionbody={post.body}
                  upvotes={post.upvotes}
                  answers={post.answers}
                />
              </div>
            )
          )}
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", flex: "1" }}
        ></div>
      </div>
    </>
  );
};

export default Postpage;
