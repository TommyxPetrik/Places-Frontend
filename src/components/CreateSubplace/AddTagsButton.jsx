import React from "react";

const AddTagsButton = ({ handleAddTags }) => {
  return (
    <button
      className="btn btn-outline-secondary text-white mt-2"
      onClick={handleAddTags}
    >
      Add
    </button>
  );
};

export default AddTagsButton;
