import React, { use, useState, useEffect } from "react";
import Navbar from "../components/homePage/navbar/Navbar";
import SidebarLeft from "../components/homePage/sideBar/SidebarLeft";
import RecentPostsAll from "../components/homePage/recentPosts/RecentPostsAll";
import NewsFeed from "../components/homePage/newsFeed/NewsFeed";
import Postpage from "../pages/PostPage";

const Homepage = () => {
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [cachedPosts, setCachedposts] = useState(null);
  const [cachedSubplaces, setcachedSubplaces] = useState(null);

  return (
    <>
      <Navbar />
      <SidebarLeft
        cachedSubplaces={cachedSubplaces}
        setcachedSubplaces={setcachedSubplaces}
      />
      {selectedPostId ? (
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
      ) : (
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
      )}
    </>
  );
};

export default Homepage;
