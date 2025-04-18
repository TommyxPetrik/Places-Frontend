import "./App.css";
import Homepage from "./pages/Homepage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import NewsFeed from "./components/homePage/newsFeed/NewsFeed";
import CreatePostPage from "./pages/CreatePostPage";
import Postpage from "./pages/PostPage";
import RecentPostsAll from "./components/homePage/recentPosts/RecentPostsAll";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    // loader: tokenLoader,
    id: "root",
    children: [
      {
        index: true,
        element: (
          <div className="container mt-4">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <NewsFeed />
              </div>
              <div className="col-lg-2">
                <RecentPostsAll />
              </div>
            </div>
          </div>
        ),
      },
      {
        path: "create",
        element: <CreatePostPage />,
      },
      {
        path: "post/:postId",
        element: (
          <div className="container mt-4">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <Postpage />
              </div>
              <div className="col-lg-2">
                <RecentPostsAll />
              </div>
            </div>
          </div>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
