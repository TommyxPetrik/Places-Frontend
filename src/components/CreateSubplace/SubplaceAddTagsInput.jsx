import React from "react";
import AddTagsButton from "./AddTagsButton";

const SubplaceAddTagsInput = ({
  value,
  onChange,
  tags,
  onRemoveTag,
  handleAddTags,
  onBlur,
  error,
}) => {
  return (
    <div className="mt-3">
      <label htmlFor="tags" className="form-label text-white">
        Create tags for your subplace (add at least 3 tags)
      </label>
      <div className="d-flex align-items-center gap-2 mb-2">
        <input
          className={`form-control form-control-lg ${
            error ? "is-invalid" : ""
          }`}
          type="text"
          id="tags"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder="Tags"
        />
        <AddTagsButton handleAddTags={handleAddTags} />
      </div>
      {error && <div className="invalid-feedback d-block">{error}</div>}

      <div className="d-flex flex-wrap gap-2 justify-content-center m-3">
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
              onClick={() => onRemoveTag(tag)}
            ></button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default SubplaceAddTagsInput;
