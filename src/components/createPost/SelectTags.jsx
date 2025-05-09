import React from "react";

const SelectTags = ({
  availableTags,
  selectedTag,
  tags,
  handleSelectChange,
  handleRemoveTag,
  onBlur,
  error,
}) => {
  return (
    <>
      <div className="mt-3">
        <label htmlFor="tags" className="form-label text-white">
          Create tags for your subplace (add at least 1 tag)
        </label>
        <div className="align-items-center d-flex justify-content-center gap-2 mb-3">
          <select
            className={`form-select ${error ? "is-invalid" : ""}`}
            aria-label="Select tag"
            value={selectedTag}
            onChange={handleSelectChange}
            onBlur={onBlur}
          >
            <option value="">Select Tags</option>
            {availableTags.map((tag, idx) => (
              <option key={idx} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
        {error && <div className="invalid-feedback d-block">{error}</div>}

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
                aria-label="Remove"
                onClick={() => handleRemoveTag(tag)}
              ></button>
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default SelectTags;
