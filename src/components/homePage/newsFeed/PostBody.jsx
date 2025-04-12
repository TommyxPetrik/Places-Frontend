import React from "react";
import PostFooter from "./PostFooter";
import PostBodyText from "./PostBodyText";

const PostBody = ({
  subplace,
  username,
  time,
  questiontitle,
  questionbody,
  tags,
  upvotes,
  onClick,
}) => {
  return (
    <div>
      <div
        onClick={onClick}
        className="card-body d-flex flex-column"
        style={{ height: "100%", cursor: "pointer" }}
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
