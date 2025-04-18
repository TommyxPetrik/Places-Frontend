import React from "react";
import PostBody from "./PostBody";

const Post = ({
  subplace,
  username,
  time,
  questiontitle,
  questionbody,
  tags,
  upvotes,
  postId,
}) => {
  return (
    <>
      <div
        className="card card-hover"
        style={{
          minHeight: "11rem",
          maxHeight: "30rem",
          marginTop: "3rem",
          marginLeft: "2rem",
          paddingTop: "0rem",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          paddingBottom: "0rem",
          borderRadius: "1rem",
          backgroundColor: "#181c1f",
          color: "white",
        }}
      >
        <PostBody
          subplace={subplace}
          username={username}
          time={time}
          questiontitle={questiontitle}
          questionbody={questionbody}
          tags={tags}
          upvotes={upvotes}
          postId={postId}
        />
      </div>
    </>
  );
};

export default Post;
