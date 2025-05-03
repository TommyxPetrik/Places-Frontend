import React from "react";

const AnswerShareButton = () => {
  const handleShare = () => {
    const url = window.location.href;
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
      <button onClick={handleShare} className="btn p-1">
        <i
          className="bi bi-share"
          style={{ fontSize: "0.8rem", color: "cornflowerblue" }}
        ></i>
      </button>
    </>
  );
};

export default AnswerShareButton;
