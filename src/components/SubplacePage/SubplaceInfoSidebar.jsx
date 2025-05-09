import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { formatDistanceToNow } from "date-fns";
import RecentPost from "../homePage/recentPosts/RecentPost";

const SubplaceInfoSidebar = () => {
  const { subplaceId } = useParams();
  const [loading, setLoading] = useState(true);
  const [subplace, setSubplace] = useState(null);
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();
  const token = user?.token;

  useEffect(() => {
    setLoading(true);
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/public/sortQuestions?order=des&sort=createdAt&limit=10"
        );
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error.mesage);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [token]);

  useEffect(() => {
    const fetchSubplace = async () => {
      if (!subplaceId) return;
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:3000/public/subplace/${subplaceId}`,
          {
            headers: {
              "x-access-token": token,
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch subplace info");
        const data = await res.json();
        setSubplace(data);
      } catch (err) {
        console.error("Error fetching subplace info:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubplace();
  }, [token, subplaceId]);

  return (
    <div
      className="card rounded-3 subplace-sidebar"
      style={{
        marginTop: "2rem",
        padding: "1rem",
        backgroundColor: "rgb(244 244 244 / 0.01)",
        color: "white",
      }}
    >
      {loading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : subplace ? (
        <div>
          <h5 className="mb-3">{subplace.name || "N/A"}</h5>
          <p className="d-flex" style={{ marginLeft: "1rem" }}>
            <strong>Description:</strong>{" "}
            <span style={{ marginLeft: "0.5rem" }}>
              {subplace.description || "No description available"}
            </span>
          </p>
          <p className="d-flex" style={{ marginLeft: "1rem" }}>
            <strong>Created:</strong>{" "}
            <span style={{ marginLeft: "0.5rem" }}>
              {subplace.createdAt
                ? formatDistanceToNow(new Date(subplace.createdAt), {
                    addSuffix: true,
                  })
                : "N/A"}
            </span>
          </p>
          <p className="d-flex" style={{ marginLeft: "1rem" }}>
            <strong>Members:</strong>{" "}
            <span style={{ marginLeft: "0.5rem" }}>
              {subplace.members ? subplace.membersids.length : 0}
            </span>
          </p>
          <p className="d-flex" style={{ marginLeft: "1rem" }}>
            <strong>Creator:</strong>{" "}
            <span style={{ marginLeft: "0.5rem" }}>
              {subplace.creator?.name || "N/A"}
            </span>
          </p>
          <p className="d-flex" style={{ marginLeft: "1rem" }}>
            <strong>Moderators:</strong>{" "}
            <span style={{ marginLeft: "0.5rem" }}>
              {subplace.moderators
                ? subplace.moderators.map((mod) => mod.name).join(", ")
                : "None"}
            </span>
          </p>
          <p className="d-flex" style={{ marginLeft: "1rem" }}>
            <strong>Questions:</strong>{" "}
            <span style={{ marginLeft: "0.5rem" }}>
              {subplace.questionsCount ?? 0}
            </span>
          </p>
          {posts?.length > 0 && (
            <div>
              <h5
                style={{
                  width: "12rem",
                  display: "flex",
                  color: "rgb(96, 103, 109)",
                }}
              >
                Recent posts
              </h5>
              {posts.map((post) => {
                return (
                  <RecentPost
                    key={post._id}
                    postId={post._id}
                    subplace={post.subplace.name}
                    username={post.userid.name}
                    questiontitle={post.title}
                    time={formatDistanceToNow(new Date(post.createdAt), {
                      addSuffix: true,
                    })}
                  />
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <p>No subplace info available.</p>
      )}
    </div>
  );
};

export default SubplaceInfoSidebar;
