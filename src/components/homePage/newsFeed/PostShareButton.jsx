import React from "react";

const PostShareButton = ({ postId }) => {
  const handleShare = () => {
    const baseUrl = window.location.origin;
    const url = `${baseUrl}/post/${postId}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("URL adresa bola skopírovaná do schránky!");
      })
      .catch((err) => {
        console.error("Chyba pri kopírovaní URL adresy:", err);
      });
  };

  return (
    <>
      <button onClick={handleShare} className="btn btn-outline-secondary">
        <i
          className="bi bi-share"
          style={{ fontSize: "1rem", color: "cornflowerblue" }}
        ></i>
      </button>
    </>
  );
};

export default PostShareButton;
