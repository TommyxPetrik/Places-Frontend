import React, { use, useState, useEffect } from "react";
import Post from "../components/homePage/newsFeed/Post";
import { is } from "date-fns/locale";
import PostBackButton from "../components/PostPage/PostBackButton";
import { formatDistanceToNow } from "date-fns";
import AnswerTree from "../components/PostPage/Answer/AnswerTree";
import CreateAnswer from "../components/PostPage/Answer/CreateAnswer";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../components/context/AuthContext";
import SignInError from "../components/SignInSignUpPage/SignInError";
import TwoFactorDelete from "../components/homePage/newsFeed/TwoFactorDelete";
import ErrorPage from "./ErrorPage";

const Postpage = () => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answerTree, setAnswerTree] = useState([]);
  const [userVotes, setUserVotes] = useState([]);
  const [loadingAnswers, setLoadingAnswers] = useState(true);
  const { postId } = useParams();
  const { user } = useAuth();
  const token = user?.token;
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const [postVotes, setPostVotes] = useState(null);
  const [answerVotes, setAnswerVotes] = useState(null);
  const [showDeleteModalPost, setShowDeleteModalPost] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [error, setError] = useState(null);
  const [ansewrToDelete, setAnsewrToDelete] = useState();
  const [showDeleteModalAnswer, setShowDeleteModalAnswer] = useState(false);

  const openPostDeleteModal = (postId) => {
    setPostToDelete(postId);
    setShowDeleteModalPost(true);
  };

  const openAnswerDeleteModal = (answerId) => {
    setAnsewrToDelete(answerId);
    setShowDeleteModalAnswer(true);
  };

  const fetchUserVotes = async () => {
    if (!token) {
      setPostVotes(null);
      setAnswerVotes(null);
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/users/getUserVotes", {
        headers: {
          "x-access-token": token,
        },
      });

      if (!res.ok) throw new Error("Unauthorized");

      const votes = await res.json();
      setPostVotes(votes?.questionVotes || {});
      setAnswerVotes(votes?.answerVotes || {});
    } catch (error) {
      console.error("Error fetching user votes:", error);
    }
  };

  const fetchPost = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:3000/public/questions/${postId}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          setError("Post not found");
        } else {
          setError("Failed to fetch post");
        }
        return;
      }

      const data = await response.json();
      let voteStatus = null;

      if (token) {
        const userVotes = await fetchUserVotes();
        const upvotedQuestions = userVotes?.questionVotes?.upvoted || [];
        const downvotedQuestions = userVotes?.questionVotes?.downvoted || [];

        voteStatus = upvotedQuestions.includes(data._id)
          ? "upvoted"
          : downvotedQuestions.includes(data._id)
          ? "downvoted"
          : null;
      }

      const enrichedPost = { ...data, voteStatus };
      setPost(enrichedPost);
    } catch (error) {
      console.error("Error fetching post:", error.message);
      setError("Network error while fetching post");
    } finally {
      setLoading(false);
    }
  };

  const fetchAnswers = async () => {
    setLoadingAnswers(true);
    try {
      const response = await fetch(
        `http://localhost:3000/public/getAnswerTree/${postId}`
      );

      if (!response.ok) throw new Error("Failed to fetch answers");

      const answerTree = await response.json();
      setAnswerTree(answerTree);
    } catch (error) {
      console.error("Error fetching answers:", error);
    } finally {
      setLoadingAnswers(false);
    }
  };

  const handlePostVoteChange = async () => {
    if (!token) return;
    try {
      const res = await fetch("http://localhost:3000/users/getUserVotes", {
        headers: {
          "x-access-token": token,
        },
      });

      if (!res.ok) throw new Error("Unauthorized");

      const votes = await res.json();
      setPostVotes(votes?.questionVotes || {});
    } catch (error) {
      console.error("Error fetching post votes:", error);
    }
  };

  const handleDeletePost = async () => {
    if (!user?.token || !postToDelete) return;

    try {
      const res = await fetch(
        `http://localhost:3000/questions/${postToDelete}`,
        {
          method: "DELETE",
          headers: {
            "x-access-token": token,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to delete post");
      setShowDeleteModalPost(false);
      fetchPost();
    } catch (err) {
      console.error("Delete error:", err.message);
    }
  };

  const handleDeleteAnswer = async () => {
    if (!user?.token || !ansewrToDelete) return;

    try {
      const res = await fetch(
        `http://localhost:3000/answers/${ansewrToDelete}`,
        {
          method: "DELETE",
          headers: {
            "x-access-token": token,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to delete post");
      setShowDeleteModalAnswer(false);
      fetchAnswers();
    } catch (err) {
      console.error("Delete error:", err.message);
    }
  };

  const handleVoteChange = async () => {
    await fetchUserVotes();
    await fetchAnswers();
  };

  const handlePostUpdated = (updatedPost) => {
    setPost(updatedPost);
    handlePostVoteChange();
  };

  useEffect(() => {
    if (!postId) return;
    fetchPost();
    fetchAnswers();
  }, [postId, token]);

  return (
    <div>
      {showModal && <SignInError onClose={() => setShowModal(false)} />}
      {showDeleteModalPost && (
        <TwoFactorDelete
          onClose={() => setShowDeleteModalPost(false)}
          onConfirm={handleDeletePost}
        />
      )}
      {showDeleteModalAnswer && (
        <TwoFactorDelete
          onClose={() => setShowDeleteModalAnswer(false)}
          onConfirm={handleDeleteAnswer}
        />
      )}
      {error ? (
        <ErrorPage message={error} />
      ) : loading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        post &&
        post.subplace &&
        post.userid && (
          <div>
            <Post
              key={post._id}
              postId={post._id}
              subplace={post.subplace.name}
              username={post.userid.name}
              time={formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })}
              tags={post.tags}
              questiontitle={post.title}
              questionbody={post.body}
              upvotes={post.upvotes}
              onPostUpdated={handlePostUpdated}
              voteStatus={
                postVotes?.upvoted?.includes(post._id)
                  ? "upvoted"
                  : postVotes?.downvoted?.includes(post._id)
                  ? "downvoted"
                  : null
              }
              onRequireLogin={openModal}
              userId={post.userid?._id}
              edited={post.edited}
              onRequestDelete={() => openPostDeleteModal(post._id)}
            />
            <div className="" style={{ display: "flex" }}>
              <PostBackButton />
            </div>
            <div
              className=""
              style={{
                marginTop: "1rem",
                marginLeft: "2rem",
              }}
            >
              <CreateAnswer
                onAnswerCreated={fetchAnswers}
                onRequireLogin={openModal}
              />
            </div>
            <div className="col-lg-12">
              {answerTree.map((answer) => (
                <AnswerTree
                  key={answer._id}
                  answer={answer}
                  onAnswerCreated={handleVoteChange}
                  userVotes={answerVotes}
                  onRequireLogin={openModal}
                  userId={answer.userid}
                  onAnswerUpdated={fetchAnswers}
                  onRequestDelete={openAnswerDeleteModal}
                />
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Postpage;
