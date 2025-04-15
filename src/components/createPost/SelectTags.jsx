import React from "react";

const SelectTags = ({selectedTag, tags, handleSelectChange, handleRemoveTag}) => {
  return (
    <>
      <div className="align-items-center d-flex justify-content-center gap-2 mb-3">
        <select
          className="form-select"
          aria-label="Default select example"
          value={selectedTag}
          onChange={handleSelectChange}
        >
          <option>Select Tags</option>
          <option value="First one">First one</option>
          <option value="React">React</option>
          <option value="Javascript">Javascript</option>
        </select>
      </div>

      <div className="d-flex flex-wrap gap-2 justify-content-center">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="badge bg-primary d-flex align-items-center gap-1"
            style={{ padding: "0.6em 1em" }}
          >
            {tag}
            <button
              type="button"
              className="btn-close btn-close-white btn-sm ms-2"
              aria-label="Close"
              onClick={() => handleRemoveTag(tag)}
            ></button>
          </span>
        ))}
      </div>
    </>
  );
};

export default SelectTags;
