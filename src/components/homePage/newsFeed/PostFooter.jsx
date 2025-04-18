import React from "react";
import PostUpvotes from "./PostUpvotes";
import PostUpvoteButton from "./PostUpvoteButton";
import PostDownvoteButton from "./PostDownvoteButton";
import PostCommentsButton from "./PostCommentsButton";
import PostShareButton from "./PostShareButton";

const PostFooter = ({ upvotes }) => {
  return (
    <div className="card-footer bg-transparent border-0 p-0 mt-0">
      <div className="d-flex justify-content-between align-items-center mt-2">
        <div className="d-flex gap-2">
          <PostUpvotes upvotes={upvotes} />
          <PostUpvoteButton />
          <PostDownvoteButton />
          <PostCommentsButton />
          <PostShareButton />
        </div>
      </div>
    </div>
  );
};

export default PostFooter;
