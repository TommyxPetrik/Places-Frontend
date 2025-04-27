import React, { use, useState, useEffect } from "react";
import Post from "../components/homePage/newsFeed/Post";
import { is } from "date-fns/locale";
import PostBackButton from "../components/PostPage/PostBackButton";
import { formatDistanceToNow } from "date-fns";
import AnswerTree from "../components/PostPage/Answer/AnswerTree";
import CreateAnswer from "../components/PostPage/Answer/CreateAnswer";
import { useParams } from "react-router-dom";

const Postpage = () => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answerTree, setAnswerTree] = useState([]);
  const { postId } = useParams();
  const [userVotes, setUserVotes] = useState([]);
  const [loadingAnswers, setLoadingAnswers] = useState(true);

  const fetchUserVotes = async () => {
    try {
      const res = await fetch("http://localhost:3000/users/getUserVotes");
      const votes = await res.json();
      setUserVotes(votes);
      return votes;
    } catch (error) {
      console.error("Error fetching user votes:", error);
    }
  };

  const fetchPost = async () => {
    try {
      const userVotes = await fetchUserVotes();
      const response = await fetch(
        `http://localhost:3000/public/questions/${postId}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      const upvotedQuestions = userVotes?.questionVotes?.upvoted || [];
      const downvotedQuestions = userVotes?.questionVotes?.downvoted || [];
      const voteStatus = upvotedQuestions.includes(data._id)
        ? "upvoted"
        : downvotedQuestions.includes(data._id)
        ? "downvoted"
        : null;

      const enrichedPost = { ...data, voteStatus };
      setPost(enrichedPost);
    } catch (error) {
      console.error("Error fetching post:", error.mesage);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnswers = async () => {
    setLoadingAnswers(true);
    try {
      const userVotes = await fetchUserVotes();

      const response = await fetch(
        `http://localhost:3000/answers/getAnswerTree/${postId}`
      );
      const answerTree = await response.json();
      setAnswerTree(answerTree);
    } catch (error) {
      console.error("Error fetching answers:", error);
    } finally {
      setLoadingAnswers(false);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchAnswers();
  }, [postId]);

  return (
    <>
      <div>
        <div>
          {loading ? (
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
                  onPostUpdated={fetchPost}
                  voteStatus={post.voteStatus}
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
                  <CreateAnswer onAnswerCreated={fetchAnswers} />
                </div>
                <div className="col-lg-12">
                  {answerTree.map((answer) => {
                    return (
                      <AnswerTree
                        key={answer._id}
                        answer={answer}
                        onAnswerCreated={fetchAnswers}
                        userVotes={userVotes}
                      />
                    );
                  })}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Postpage;
