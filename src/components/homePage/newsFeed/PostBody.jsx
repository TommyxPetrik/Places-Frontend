import React from "react";
import PostFooter from "./PostFooter";
import PostBodyText from "./PostBodyText";

const PostBody = ({
  subplace,
  username,
  time,
  questiontitle,
  questionbody,
}) => {
  return (
    <div className="card-body d-flex flex-column" style={{ height: "100%" }}>
      <PostBodyText
        subplace={subplace}
        username={username}
        time={time}
        questiontitle={questiontitle}
        questionbody={questionbody}
      />
      <PostFooter />
    </div>
  );
};

export default PostBody;
