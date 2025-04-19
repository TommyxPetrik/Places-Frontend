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

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/public/questions/${postId}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setPost(data);
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
                  answers={post.answers}
                  onPostUpdated={fetchPosts}
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
                  {answerTree.map((answer) => (
                    <AnswerTree
                      key={answer._id}
                      answer={answer}
                      onAnswerCreated={fetchPosts}
                    />
                  ))}
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
