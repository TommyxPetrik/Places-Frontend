import React, { use, useState, useEffect } from "react";
import Navbar from "../components/homePage/navbar/Navbar";
import SidebarLeft from "../components/homePage/sideBar/SidebarLeft";
import RecentPostsAll from "../components/homePage/recentPosts/RecentPostsAll";
import NewsFeed from "../components/homePage/newsFeed/NewsFeed";
import Postpage from "../pages/PostPage";
import CreatePostPage from "./CreatePostPage";

const Homepage = () => {
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [cachedPosts, setCachedposts] = useState(null);
  const [cachedSubplaces, setcachedSubplaces] = useState(null);
  const [createPost, setCreatePost] = useState(false);

  let mainContent;
};
export default Homepage;
