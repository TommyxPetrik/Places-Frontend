import React from "react";

const RecentPostBody = ({
  subplace,
  questiontitle,
  username,
  time,
  onClick,
}) => {
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };
  return (
    <>
      <div onClick={onClick}>
        <div className="card-header p-0">{subplace}</div>
        <div className="card-body p-0">
          <blockquote
            className="blockquote mb-0"
            style={{ fontSize: "1rem", padding: "0rem" }}
          >
            <p>{truncateText(questiontitle, 30)}</p>
            <footer className="blockquote-footer">
              <cite title="Source Title">{username + " - " + time}</cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </>
  );
};

export default RecentPostBody;
