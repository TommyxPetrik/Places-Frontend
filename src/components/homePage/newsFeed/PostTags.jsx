import React, { useEffect, useState, useRef } from "react";
import PostOneTag from "./PostOneTag";

const PostTags = ({ tags }) => {
  const containerRef = useRef(null);
  const [maxTags, setMaxTags] = useState(3);
  const tagWidth = 80;

  const calculateMaxTags = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const maxTagsInContainer = Math.floor(containerWidth / tagWidth);
      setMaxTags(maxTagsInContainer);
    }
  };

  useEffect(() => {
    calculateMaxTags();
    window.addEventListener("resize", calculateMaxTags);

    return () => {
      window.removeEventListener("resize", calculateMaxTags);
    };
  }, []);

  const displayedTags = tags.slice(0, maxTags);
  const hiddenTags = tags.length > maxTags ? tags.slice(maxTags) : [];

  return (
    <div
      className="d-flex flex-nowrap overflow-hidden text-truncate"
      style={{ maxWidth: "100%", whiteSpace: "nowrap" }}
      title={hiddenTags.length > 0 ? `${tags.join(", ")}` : ""}
      ref={containerRef}
    >
      {displayedTags.map((tag, index) => (
        <PostOneTag key={index} tag={tag} />
      ))}
      {hiddenTags.length > 0 && (
        <span
          className="badge text-bg-secondary"
          style={{ marginLeft: "0.3rem" }}
        >
          ...
        </span>
      )}
    </div>
  );
};

export default PostTags;
