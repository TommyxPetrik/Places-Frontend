import React, { use, useState, useEffect } from "react";
import Navbar from "../components/homePage/navbar/Navbar";
import SidebarLeft from "../components/homePage/sideBar/SidebarLeft";
import RecentPostsAll from "../components/homePage/recentPosts/RecentPostsAll";
import NewsFeed from "../components/homePage/newsFeed/NewsFeed";

const Homepage = ({
  onPostSelect,
  cachedPosts,
  setCachedposts,
  cachedSubplaces,
  setcachedSubplaces,
}) => {
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
          <NewsFeed
            onPostSelect={onPostSelect}
            cachedPosts={cachedPosts}
            setCachedposts={setCachedposts}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", flex: "1" }}>
          <RecentPostsAll />
        </div>
      </div>
    </>
  );
};

export default Homepage;
