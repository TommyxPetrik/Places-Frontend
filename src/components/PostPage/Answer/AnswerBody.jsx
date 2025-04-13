import React from "react";
import AnswerFooter from "./AnswerFooter";
import AnswerBodyText from "./AnswerBodyText";

const AnswerBody = ({
  subplace,
  username,
  time,
  questiontitle,
  questionbody,
  tags,
  upvotes,
  onClick,
}) => {
  return (
    <div>
      <div
        onClick={onClick}
        className="card-body d-flex flex-column"
        style={{ height: "100%", cursor: "pointer", width: "35rem" }}
      >
        <AnswerBodyText
          subplace={subplace}
          username={username}
          time={time}
          questiontitle={questiontitle}
          questionbody={questionbody}
          tags={tags}
        />
      </div>
      <div>
        <AnswerFooter upvotes={upvotes} onClick={onClick} />
      </div>
    </div>
  );
};

export default AnswerBody;
