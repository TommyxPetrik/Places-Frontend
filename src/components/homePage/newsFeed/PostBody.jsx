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
}) => {
  return (
    <div className="card-body d-flex flex-column" style={{ height: "100%" }}>
      <PostBodyText
        subplace={subplace}
        username={username}
        time={time}
        questiontitle={questiontitle}
        questionbody={questionbody}
        tags={tags}
      />
      <PostFooter upvotes={upvotes} />
    </div>
  );
};

export default PostBody;
