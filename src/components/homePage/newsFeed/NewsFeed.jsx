import React, { use, useState, useEffect } from "react";
import Post from "./Post";
import { formatDistanceToNow } from "date-fns";
import { useUserVotes } from "../../../context/UserVotesContext";

const NewsFeed = ({ onPostSelect, cachedPosts, setCachedPosts }) => {
  const [posts, setPosts] = useState(cachedPosts || []);
  const [loading, setLoading] = useState(true);

  const userVotes = useUserVotes();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let freshPosts = cachedPosts;
        if (!cachedPosts) {
          const postsRes = await fetch("http://localhost:3000/public/feed");
          freshPosts = await postsRes.json();
        }

        const upvotedQuestions = userVotes?.questionVotes?.upvoted || [];
        const downvotedQuestions = userVotes?.questionVotes?.downvoted || [];

        const enrichedPosts = freshPosts.map((post) => ({
          ...post,
          voteStatus: upvotedQuestions.includes(post._id)
            ? "upvoted"
            : downvotedQuestions.includes(post._id)
            ? "downvoted"
            : null,
        }));

        setPosts(enrichedPosts);
        setCachedPosts(enrichedPosts);
      } catch (error) {
        console.error("Error during fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cachedPosts, setCachedPosts]);

  const handlePostUpdate = (updatedPost) => {
    const voteStatus = userVotes?.questionVotes?.upvoted.includes(
      updatedPost._id
    )
      ? "upvoted"
      : userVotes?.questionVotes?.downvoted.includes(updatedPost._id)
      ? "downvoted"
      : null;

    const updatedWithStatus = { ...updatedPost, voteStatus };

    setPosts((prev) =>
      prev.map((p) => (p._id === updatedPost._id ? updatedWithStatus : p))
    );

    setCachedPosts((prev) =>
      prev.map((p) => (p._id === updatedPost._id ? updatedWithStatus : p))
    );
  };

  return (
    <>
      <div>
        {loading ? (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          posts.length > 0 && (
            <div>
              {posts.map((post) => {
                const upvotedQuestions =
                  userVotes?.questionVotes?.upvoted || [];
                const downvotedQuestions =
                  userVotes?.questionVotes?.downvoted || [];

                const voteStatus = upvotedQuestions.includes(post._id)
                  ? "upvoted"
                  : downvotedQuestions.includes(post._id)
                  ? "downvoted"
                  : null;
                return (
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
                    voteStatus={voteStatus}
                  />
                );
              })}
            </div>
          )
        )}
      </div>
    </>
  );
};

export default NewsFeed;
