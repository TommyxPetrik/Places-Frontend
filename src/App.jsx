import { useState } from "react";
import "./App.css";
import Homepage from "./pages/Homepage";
import Postpage from "./pages/PostPage";

function App() {
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [cachedPosts, setCachedposts] = useState(null);
  const [cachedSubplaces, setcachedSubplaces] = useState(null);

  return (
    <>
      {selectedPostId ? (
        <Postpage
          postId={selectedPostId}
          onBack={() => setSelectedPostId(null)}
          cachedSubplaces={cachedSubplaces}
          setcachedSubplaces={setcachedSubplaces}
        />
      ) : (
        <Homepage
          onPostSelect={setSelectedPostId}
          cachedPosts={cachedPosts}
          setCachedposts={setCachedposts}
          cachedSubplaces={cachedSubplaces}
          setcachedSubplaces={setcachedSubplaces}
        />
      )}
    </>
  );
}

export default App;
