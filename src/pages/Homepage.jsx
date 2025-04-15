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

  if (createPost) {
    mainContent = (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <CreatePostPage onCancel={() => setCreatePost(false)} />
          </div>
        </div>
      </div>
    );
  } else if (selectedPostId) {
    mainContent = (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <Postpage
              postId={selectedPostId}
              onBack={() => setSelectedPostId(null)}
              cachedSubplaces={cachedSubplaces}
              setcachedSubplaces={setcachedSubplaces}
            />
          </div>
          <div className="col-lg-2">
            <RecentPostsAll
              onPostSelect={setSelectedPostId}
              cachedPosts={cachedPosts}
              setCachedposts={setCachedposts}
            />
          </div>
        </div>
      </div>
    );
  } else {
    mainContent = (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <NewsFeed
              onPostSelect={setSelectedPostId}
              cachedPosts={cachedPosts}
              setCachedposts={setCachedposts}
            />
          </div>
          <div className="col-lg-2">
            <RecentPostsAll
              onPostSelect={setSelectedPostId}
              cachedPosts={cachedPosts}
              setCachedposts={setCachedposts}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar onClick={() => setCreatePost(true)} />
      <SidebarLeft
        cachedSubplaces={cachedSubplaces}
        setcachedSubplaces={setcachedSubplaces}
      />
      {mainContent}
    </>
  );
};

export default Homepage;
