import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../components/homePage/newsFeed/Post";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "../components/context/AuthContext";
import SignInError from "../components/SignInSignUpPage/SignInError";
import SubplacePageBackButton from "../components/SubplacePage/SubplacePageBackButton";

const SubplacePage = () => {
  const { subplaceId } = useParams();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [subplace, setSubplace] = useState(null);
  const { user } = useAuth();
  const token = user?.token;

  useEffect(() => {
    const fetchSubplace = async () => {
      if (!subplaceId) return;
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
      }
    };

    fetchSubplace();
  }, [token, subplaceId]);

  const fetchUserVotes = async () => {
    if (!token) return null;
    try {
      const res = await fetch("http://localhost:3000/users/getUserVotes", {
        headers: {
          "x-access-token": token,
        },
      });
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn("Error fetching user votes:", err.message);
    }
    return null;
  };

  const fetchPosts = async (append = false) => {
    if (!append) setLoading(true);
    setIsFetching(true);
    try {
      const voteData = await fetchUserVotes();
      const res = await fetch(
        `http://localhost:3000/public/getSuplacesQuestions/${subplaceId}?page=${page}&limit=10`
      );
      if (!res.ok) throw new Error("Failed to fetch subplace questions");

      const rawPosts = await res.json();

      const enrichedPosts = rawPosts.map((post) => {
        const voteStatus = voteData?.questionVotes?.upvoted.includes(post._id)
          ? "upvoted"
          : voteData?.questionVotes?.downvoted.includes(post._id)
          ? "downvoted"
          : null;

        return { ...post, voteStatus };
      });

      setPosts((prev) =>
        append
          ? [
              ...prev,
              ...enrichedPosts.filter(
                (p) => !prev.some((x) => x._id === p._id)
              ),
            ]
          : enrichedPosts
      );

      if (rawPosts.length < 10) setHasMore(false);
    } catch (err) {
      console.error("Fetch error:", err.message);
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  };

  const handlePostUpdate = async (updatedPost) => {
    try {
      const freshVotes = await fetchUserVotes();

      const voteStatus = freshVotes?.questionVotes?.upvoted.includes(
        updatedPost._id
      )
        ? "upvoted"
        : freshVotes?.questionVotes?.downvoted.includes(updatedPost._id)
        ? "downvoted"
        : null;

      const updatedWithStatus = { ...updatedPost, voteStatus };

      setPosts((prev) =>
        prev.map((post) =>
          post._id === updatedPost._id ? updatedWithStatus : post
        )
      );
    } catch (err) {
      console.error("Error updating post votes:", err.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [subplaceId]);

  useEffect(() => {
    if (token) {
      fetchPosts();
    }
  }, [token]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        if (hasMore && !loading && !isFetching) {
          setPage((prev) => prev + 1);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading, isFetching]);

  useEffect(() => {
    if (page > 1) fetchPosts(true);
  }, [page]);

  return (
    <div>
      {showModal && <SignInError onClose={() => setShowModal(false)} />}
      <div className="" style={{ display: "flex" }}>
        <SubplacePageBackButton />
      </div>
      {loading ? (
        <div className="d-flex justify-content-center my-3">
          <div className="spinner-border" role="status" />
        </div>
      ) : (
        <>
          <div className="mt-5 text-white">
            {subplace ? (
              <h2 className="mb-3">{subplace.name}</h2>
            ) : (
              <h2 className="mb-3">Loading subplace...</h2>
            )}
          </div>
          {posts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              subplace={post.subplace?.name}
              username={post.username}
              time={formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })}
              tags={post.tags}
              questiontitle={post.title}
              questionbody={post.body}
              upvotes={post.upvotes}
              onPostUpdated={handlePostUpdate}
              voteStatus={post.voteStatus}
              edited={post.edited}
              answerCount={post.answerCount}
            />
          ))}
        </>
      )}
      {!loading && !hasMore && (
        <div className="text-center my-3 text-white">
          <p>Žiadne ďalšie príspevky na načítanie.</p>
        </div>
      )}
    </div>
  );
};

export default SubplacePage;
