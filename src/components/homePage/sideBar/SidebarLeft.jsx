import React, { use, useState, useEffect } from "react";
import SideBarButton from "./SideBarButton";
import SideBarBody from "./SideBarBody";

const Sidebar = ({ cachedSubplaces, setcachedSubplaces }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const [posts, setPosts] = useState(cachedSubplaces || []);

  useEffect(() => {
    if (!cachedSubplaces) {
      const fetchPosts = async () => {
        try {
          const response = await fetch(
            "http://localhost:3000/public/getSubplacesFeed"
          );
          const data = await response.json();
          setPosts(data);
          setcachedSubplaces(data);
        } catch (error) {
          console.error("Error fetching posts:", error.mesage);
        }
      };
      fetchPosts();
    }
  }, [cachedSubplaces, setcachedSubplaces]);

  return (
    <>
      <SideBarButton onClick={toggleSidebar} isOpen={isOpen} />
      <SideBarBody isOpen={isOpen} subplaces={posts} />
    </>
  );
};

export default Sidebar;
