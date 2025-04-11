import React, { use, useState, useEffect } from "react";
import Navbar from "../components/homePage/navbar/Navbar";
import SidebarLeft from "../components/homePage/sideBar/SidebarLeft";
import RecentPostsAll from "../components/homePage/recentPosts/RecentPostsAll";
import NewsFeed from "../components/homePage/newsFeed/NewsFeed";

const Homepage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/public/getAllQuestions"
        );
        const data = await response.json();
        setPosts(
          data.map((post) => {
            return {
              ...post,
            };
          })
        );
      } catch (error) {
        alert("Error fetching posts:", error.mesage);
      }
    };
    fetchPosts();
  }, []);

  return (
    <>
      <Navbar />
      <SidebarLeft />
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
          <NewsFeed />
        </div>
        <div style={{ display: "flex", flexDirection: "column", flex: "1" }}>
          <RecentPostsAll />
        </div>
      </div>
    </>
  );
};

export default Homepage;
