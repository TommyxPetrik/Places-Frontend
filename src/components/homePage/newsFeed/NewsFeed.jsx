import React, { use, useState, useEffect } from "react";
import Post from "./Post";
import { formatDistanceToNow } from "date-fns";

const NewsFeed = ({ onPostSelect }) => {
  const [cachedPosts, setCachedposts] = useState(null);
  const [posts, setPosts] = useState(cachedPosts || []);
  const [loading, setLoading] = useState(true);
  const [userVotes, setUserVotes] = useState({
    upvotedQuestions: [],
    downvotedQuestions: [],
    upvotedAnswers: [],
    downvotedAnswers: [],
  });

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const res = await fetch("http://localhost:3000/users/getUserVotes");
        const votes = await res.json();
        setUserVotes(votes);
      } catch (error) {
        console.error("Chyba pri načítaní hlasov:", error.message);
      }
    };
    fetchVotes();
    if (cachedPosts) {
      setLoading(false);
    }
    if (!cachedPosts) {
      const fetchPosts = async () => {
        try {
          const response = await fetch("http://localhost:3000/public/feed");
          const data = await response.json();
          setPosts(data);
          setCachedposts(data);
        } catch (error) {
          console.error("Error fetching posts:", error.mesage);
        } finally {
          setLoading(false);
        }
      };

      fetchPosts();
    }
  }, [cachedPosts, setCachedposts]);

  const handlePostUpdate = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((p) => (p._id === updatedPost._id ? updatedPost : p))
    );
    setCachedposts((prevPosts) =>
      prevPosts.map((p) => (p._id === updatedPost._id ? updatedPost : p))
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
