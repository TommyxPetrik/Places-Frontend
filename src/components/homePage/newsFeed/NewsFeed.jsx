import React, { useState, useEffect } from "react";
import Post from "./Post";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "../../context/AuthContext";
import SignInError from "../../SignInSignUpPage/SignInError";
import { useLocation } from "react-router-dom";

const NewsFeed = ({ cachedPosts, setCachedPosts }) => {
  const [posts, setPosts] = useState(cachedPosts || []);
  const [loading, setLoading] = useState(true);
  const [userVotes, setUserVotes] = useState();
  const { user } = useAuth();
  const token = user?.token;
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const location = useLocation();
  const prevUserRef = React.useRef();

  useEffect(() => {
    const refreshCachedPosts = async () => {
      if (!cachedPosts || cachedPosts.length === 0) {
        setLoading(false);
        return;
      }

      setLoading(true);

      const freshVotes = token
        ? await fetch("http://localhost:3000/users/getUserVotes", {
            headers: {
              "x-access-token": token,
            },
          })
            .then((res) => (res.ok ? res.json() : null))
            .catch((err) => {
              console.warn("Error fetching votes:", err.message);
              return null;
            })
        : null;

      const updatedPosts = await Promise.all(
        cachedPosts.map(async (cachedPost) => {
          try {
            const res = await fetch(
              `http://localhost:3000/public/questions/${cachedPost._id}`
            );
            const freshPost = await res.json();

            const voteStatus = freshVotes?.questionVotes?.upvoted.includes(
              freshPost._id
            )
              ? "upvoted"
              : freshVotes?.questionVotes?.downvoted.includes(freshPost._id)
              ? "downvoted"
              : null;

            return { ...freshPost, voteStatus };
          } catch (err) {
            console.warn("Error refreshing post:", err.message);
            return cachedPost;
          }
        })
      );

      setPosts(updatedPosts);
      setCachedPosts(updatedPosts);
      setLoading(false);
    };

    if (location.pathname === "/") {
      refreshCachedPosts();
    }
  }, [location.pathname, token]);

  const fetchData = async (append = false) => {
    if (!append) setLoading(true);
    setIsFetching(true);
    try {
      let freshVotes = null;

      if (token) {
        try {
          const votesRes = await fetch(
            "http://localhost:3000/users/getUserVotes",
            {
              headers: {
                "x-access-token": token,
              },
            }
          );

          if (votesRes.ok) {
            freshVotes = await votesRes.json();
            setUserVotes(freshVotes);
          } else {
            console.warn("No user votes found or unauthorized.");
          }
        } catch (err) {
          console.warn("Error fetching user votes:", err.message);
        }
      } else {
        setUserVotes(null);
      }

      const postsRes = await fetch(
        `http://localhost:3000/public/feed?page=${page}&limit=10`
      );

      if (!postsRes.ok) throw new Error("Failed to fetch posts");

      const basePosts = await postsRes.json();

      const enrichedPosts = await Promise.all(
        basePosts.map(async (cachedPost) => {
          try {
            const res = await fetch(
              `http://localhost:3000/public/questions/${cachedPost._id}`
            );
            const freshPost = await res.json();

            const voteStatus = freshVotes?.questionVotes?.upvoted.includes(
              freshPost._id
            )
              ? "upvoted"
              : freshVotes?.questionVotes?.downvoted.includes(freshPost._id)
              ? "downvoted"
              : null;

            return { ...freshPost, voteStatus };
          } catch (err) {
            console.error("Error fetching single post", err);
            return { ...cachedPost, voteStatus: null };
          } finally {
            if (!append) setLoading(false);
            setIsFetching(false);
          }
        })
      );

      const uniquePosts = append
        ? Array.from(
            new Map(
              [...posts, ...enrichedPosts].map((post) => [post._id, post])
            ).values()
          )
        : enrichedPosts;

      setPosts(uniquePosts);
      setCachedPosts(uniquePosts);

      if (basePosts.length < 10) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error during fetching data:", error.message);
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (prevUserRef.current && !user) {
      setCachedPosts([]);
      setPosts([]);
      fetchData();
    }
    prevUserRef.current = user;
  }, [user]);

  useEffect(() => {
    if (!cachedPosts || cachedPosts.length === 0) {
      fetchData();
    }
  }, [token]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        if (hasMore && !loading && !isFetching) {
          setIsFetching(true);
          setPage((prev) => prev + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore, loading, isFetching]);

  useEffect(() => {
    if (page > 1) {
      fetchData(true);
    }
  }, [page]);

  const handlePostUpdate = async (updatedPost) => {
    try {
      let freshVotes = null;
      if (token) {
        const votesRes = await fetch(
          "http://localhost:3000/users/getUserVotes",
          {
            headers: {
              "x-access-token": token,
            },
          }
        );

        if (votesRes.ok) {
          freshVotes = await votesRes.json();
          setUserVotes(freshVotes);
        } else {
          console.warn("No user votes found or unauthorized.");
        }
      }

      const voteStatus = freshVotes?.questionVotes?.upvoted.includes(
        updatedPost._id
      )
        ? "upvoted"
        : freshVotes?.questionVotes?.downvoted.includes(updatedPost._id)
        ? "downvoted"
        : null;

      const updatedWithStatus = { ...updatedPost, voteStatus };

      setPosts((prev) =>
        prev.map((p) => (p._id === updatedPost._id ? updatedWithStatus : p))
      );

      setCachedPosts((prev) =>
        prev.map((p) => (p._id === updatedPost._id ? updatedWithStatus : p))
      );
    } catch (error) {
      console.error("Error updating post:", error.message);
    }
  };

  const handlePostSelect = (postId) => {
    setPosts((prev) =>
      prev.map((post) =>
        post._id === postId
          ? { ...post, active: true }
          : { ...post, active: false }
      )
    );
    setCachedPosts((prev) =>
      prev.map((post) =>
        post._id === postId
          ? { ...post, active: true }
          : { ...post, active: false }
      )
    );
  };

  return (
    <div>
      {showModal && <SignInError setShowModal={setShowModal} />}
      {loading ? (
        <div className="d-flex justify-content-center my-3">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        posts.map((post) => (
          <Post
            key={post._id}
            postId={post._id}
            subplaceName={post.subplace?.name}
            subplaceId={post.subplace._id}
            username={post.userid?.name}
            time={formatDistanceToNow(new Date(post.createdAt), {
              addSuffix: true,
            })}
            tags={post.tags}
            questiontitle={post.title}
            questionbody={post.body}
            upvotes={post.upvotes}
            onPostUpdated={handlePostUpdate}
            onClick={() => handlePostSelect(post._id)}
            voteStatus={post.voteStatus}
            onRequireLogin={openModal}
            edited={post.edited}
            answerCount={post.answerCount}
            trim="nowrap"
          />
        ))
      )}
      {!loading && !hasMore && (
        <div className="text-center my-3 text-white">
          <p>Žiadne ďalšie príspevky na načítanie.</p>
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
