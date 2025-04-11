import React, { use, useState, useEffect } from "react";
import SideBarButton from "./SideBarButton";
import SideBarBody from "./SideBarBody";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/public/getSubplacesFeed"
        );
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        alert("Error fetching posts:", error.mesage);
      }
    };
    fetchPosts();
  }, []);

  return (
    <>
      <SideBarButton onClick={toggleSidebar} isOpen={isOpen} />
      <SideBarBody isOpen={isOpen} subplaces={posts} />
    </>
  );
};

export default Sidebar;
