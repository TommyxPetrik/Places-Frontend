import React, { useEffect, useState, useRef } from "react";
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
  const [userVotes, setUserVotes] = useState();
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();
  const token = user?.token;

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

      const enrichedPosts = await Promise.all(
        rawPosts.map(async (p) => {
          try {
            const single = await fetch(
              `http://localhost:3000/public/questions/${p._id}`
            );
            const freshPost = await single.json();

            const voteStatus = voteData?.questionVotes?.upvoted.includes(
              freshPost._id
            )
              ? "upvoted"
              : voteData?.questionVotes?.downvoted.includes(freshPost._id)
              ? "downvoted"
              : null;

            return { ...freshPost, voteStatus };
          } catch (err) {
            console.error("Error enriching post:", err.message);
            return { ...p, voteStatus: null };
          }
        })
      );

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

  useEffect(() => {
    fetchPosts();
  }, [subplaceId]);

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

  const handlePostUpdate = (updatedPost) => {
    setPosts((prev) =>
      prev.map((post) =>
        post._id === updatedPost._id ? { ...updatedPost } : post
      )
    );
  };

  return (
    <div>
      {showModal && <SignInError onClose={() => setShowModal(false)} />}
      {!loading && posts.length > 0 && (
        <div className="text-center my-4">
          <h2 className="text-white fw-bold">
            Subplace: {posts[0].subplace?.name}
          </h2>
        </div>
      )}
      <div className="" style={{ display: "flex" }}>
        <SubplacePageBackButton />
      </div>
      {loading ? (
        <div className="d-flex justify-content-center my-3">
          <div className="spinner-border" role="status" />
        </div>
      ) : (
        posts.map((post) => (
          <Post
            key={post._id}
            postId={post._id}
            subplace={post.subplace?.name}
            username={post.userid?.name}
            time={formatDistanceToNow(new Date(post.createdAt), {
              addSuffix: true,
            })}
            tags={post.tags}
            questiontitle={post.title}
            questionbody={post.body}
            upvotes={post.upvotes}
            onPostUpdated={handlePostUpdate}
            voteStatus={post.voteStatus}
            onRequireLogin={() => setShowModal(true)}
            edited={post.edited}
            answerCount={post.answers.length}
          />
        ))
      )}
      {!loading && !hasMore && (
        <div className="text-center my-3 text-white">
          <p>Žiadne ďalšie príspevky v tomto subplace.</p>
        </div>
      )}
    </div>
  );
};

export default SubplacePage;
