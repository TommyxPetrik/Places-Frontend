import React from "react";
import PostFooter from "./PostFooter";
import PostBodyText from "./PostBodyText";
import { useNavigate } from "react-router-dom";

const PostBody = ({
  subplace,
  username,
  time,
  questiontitle,
  questionbody,
  tags,
  upvotes,
  postId,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${postId}`);
  };
  return (
    <div>
      <div
        onClick={handleClick}
        className="card-body d-flex flex-column"
        style={{ height: "100%", cursor: "pointer", width: "35rem" }}
      >
        <PostBodyText
          subplace={subplace}
          username={username}
          time={time}
          questiontitle={questiontitle}
          questionbody={questionbody}
          tags={tags}
        />
      </div>
      <div>
        <PostFooter upvotes={upvotes} />
      </div>
    </div>
  );
};

export default PostBody;
