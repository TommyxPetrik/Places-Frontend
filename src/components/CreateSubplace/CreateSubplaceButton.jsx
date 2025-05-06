import React from "react";

const CreateSubplaceButton = ({ handleCreateSubplace, disabled }) => {
  return (
    <button
      type="button"
      className="btn btn-outline-secondary text-white"
      aria-label="Create"
      onClick={handleCreateSubplace}
      disabled={disabled}
    >
      Create
    </button>
  );
};

export default CreateSubplaceButton;
