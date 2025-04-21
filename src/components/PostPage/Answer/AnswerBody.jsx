import React from "react";
import AnswerFooter from "./AnswerFooter";
import AnswerBodyText from "./AnswerBodyText";

const AnswerBody = ({
  username,
  body,
  time,
  upvotes,
  onClick,
  answerId,
  onAnswerCreated,
  voteStatus,
}) => {
  return (
    <div>
      <div onClick={onClick} className="card-body d-flex flex-column p-0">
        <AnswerBodyText username={username} time={time} body={body} />
      </div>
      <div>
        <AnswerFooter
          upvotes={upvotes}
          onClick={onClick}
          answerId={answerId}
          onAnswerCreated={onAnswerCreated}
          voteStatus={voteStatus}
        />
      </div>
    </div>
  );
};

export default AnswerBody;
