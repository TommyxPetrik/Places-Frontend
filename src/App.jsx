import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import NewsFeed from "./components/homePage/newsFeed/NewsFeed";
import CreatePostPage from "./pages/CreatePostPage";
import Postpage from "./pages/PostPage";
import RecentPostsAll from "./components/homePage/recentPosts/RecentPostsAll";
import { useState } from "react";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import CreateSubplacePage from "./pages/CreateSubplacePage";
import AllSubplacesFeed from "./pages/AllSubplacesFeed";
import SubplacePage from "./pages/SubplacePage";
import SubplaceInfoSidebar from "./components/SubplacePage/SubplaceInfoSidebar";
import UserProfile from "./pages/ProfilePage";
import AdminPanel from "./pages/AdminPanel";
import ProtectedRouteAdmin from "./utils/ProtectedRouteAdmin";

function App() {
  const [cachedPosts, setCachedPosts] = useState(null);
  const [cachedSubplaces, setCachedSubplaces] = useState(null);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      id: "root",
      children: [
        {
          index: true,
          element: (
            <div className="container mt-4" style={{ width: "1000px" }}>
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <NewsFeed
                    cachedPosts={cachedPosts}
                    setCachedPosts={setCachedPosts}
                  />
                </div>
                <div className="col-lg-4">
                  <RecentPostsAll />
                </div>
              </div>
            </div>
          ),
        },
        {
          path: "create",
          element: (
            <div className="container mt-4" style={{ width: "1000px" }}>
              <div className="row justify-content-center">
                <div className="col-lg-6">
                  <ProtectedRoute>
                    <CreatePostPage />
                  </ProtectedRoute>
                </div>
              </div>
            </div>
          ),
        },
        {
          path: "post/:postId",
          element: (
            <div className="container mt-4" style={{ width: "1000px" }}>
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <Postpage />
                </div>
                <div className="col-lg-4">
                  <RecentPostsAll />
                </div>
              </div>
            </div>
          ),
        },
        {
          path: "SignIn",
          element: (
            <div className="container mt-4" style={{ width: "1000px" }}>
              <div className="row justify-content-center">
                <div className="col-lg-6">
                  <SignInPage />
                </div>
              </div>
            </div>
          ),
        },
        {
          path: "SignUp",
          element: (
            <div className="container mt-4" style={{ width: "1000px" }}>
              <div className="row justify-content-center">
                <div className="col-lg-6">
                  <SignUpPage />
                </div>
              </div>
            </div>
          ),
        },
        {
          path: "createSubplace",
          element: (
            <div className="container mt-4" style={{ width: "1000px" }}>
              <div className="row justify-content-center">
                <div className="col-lg-6">
                  <ProtectedRoute>
                    <CreateSubplacePage />
                  </ProtectedRoute>
                </div>
              </div>
            </div>
          ),
        },
        {
          path: "AllSubplaces",
          element: (
            <div className="container mt-4" style={{ width: "1000px" }}>
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <AllSubplacesFeed
                    cachedSubplaces={cachedSubplaces}
                    setCachedSubplaces={setCachedSubplaces}
                  />
                </div>
                <div className="col-lg-4">
                  <RecentPostsAll />
                </div>
              </div>
            </div>
          ),
        },
        {
          path: "subplace/:subplaceId",
          element: (
            <div className="container mt-4" style={{ width: "1000px" }}>
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <SubplacePage />
                </div>
                <div className="col-lg-4">
                  <SubplaceInfoSidebar />
                </div>
              </div>
            </div>
          ),
        },
        {
          path: "profile/:userId",
          element: (
            <div className="container mt-4" style={{ width: "1000px" }}>
              <div className="row justify-content-center">
                <div className="col-lg-12">
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                </div>
              </div>
            </div>
          ),
        },
        {
          path: "admin",
          element: (
            <div className="container mt-4" style={{ width: "1000px" }}>
              <div className="row justify-content-center">
                <div className="col-lg-12">
                  <ProtectedRouteAdmin>
                    <AdminPanel />
                  </ProtectedRouteAdmin>
                </div>
              </div>
            </div>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
