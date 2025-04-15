import React from "react";

const CreatePostPageButton = ({handleCreatePost}) => {
  return (
    <>
      <button
        className="btn btn-outline-secondary text-white mt-3"
        onClick={handleCreatePost}
      >
        Create
      </button>
    </>
  );
};

export default CreatePostPageButton;
