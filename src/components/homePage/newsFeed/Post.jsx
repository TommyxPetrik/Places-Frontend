import React from "react";
import PostBody from "./PostBody";

const Post = ({
  subplaceName,
  subplaceModerators,
  username,
  time,
  questiontitle,
  questionbody,
  tags,
  upvotes,
  postId,
  onPostUpdated,
  voteStatus,
  onRequireLogin,
  userId,
  edited,
  onRequestDelete,
  answerCount,
  subplaceId,
  trim,
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
          subplaceName={subplaceName}
          subplaceModerators={subplaceModerators}
          username={username}
          time={time}
          questiontitle={questiontitle}
          questionbody={questionbody}
          tags={tags}
          upvotes={upvotes}
          postId={postId}
          onPostUpdated={onPostUpdated}
          voteStatus={voteStatus}
          onRequireLogin={onRequireLogin}
          userId={userId}
          edited={edited}
          onRequestDelete={onRequestDelete}
          answerCount={answerCount}
          subplaceId={subplaceId}
          trim={trim}
        />
      </div>
    </>
  );
};

export default Post;
