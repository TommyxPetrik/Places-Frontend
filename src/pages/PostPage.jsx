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
  const [userVotes, setUserVotes] = useState();

  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:3000/users/getUserVotes");
      const votes = await res.json();
      setUserVotes(votes);

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
      const response2 = await fetch(
        `http://localhost:3000/answers/getAnswerTree/${postId}`,
        {
          method: "GET",
        }
      );
      const answerTree = await response2.json();
      setAnswerTree(answerTree);
    } catch (error) {
      console.error("Error fetching posts:", error.mesage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [postId, userVotes]);

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
                  answers={post.answers}
                  onPostUpdated={fetchPosts}
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
                  <CreateAnswer onAnswerCreated={fetchPosts} />
                </div>
                <div className="col-lg-12">
                  {answerTree.map((answer) => {
                    const upvotedAnswers =
                      userVotes?.answerVotes?.upvoted || [];
                    const downvotedAnswers =
                      userVotes?.answerVotes?.downvoted || [];
                    const voteStatus = upvotedAnswers.includes(answer._id)
                      ? "upvoted"
                      : downvotedAnswers.includes(answer._id)
                      ? "downvoted"
                      : null;
                    return (
                      <AnswerTree
                        key={answer._id}
                        answer={answer}
                        onAnswerCreated={fetchPosts}
                        voteStatus={voteStatus}
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
