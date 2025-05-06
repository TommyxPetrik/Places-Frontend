import React from "react";
import SubplaceBody from "./SubplaceBody";

const Subplace = ({
  subplace,
  time,
  tags,
  voteStatus,
  description,
  subplaceId,
  questionCount,
}) => {
  return (
    <>
      <div
        className="card card-hover"
        style={{
          minHeight: "11rem",
          maxHeight: "30rem",
          marginTop: "3rem",
          marginLeft: "2rem",
          paddingTop: "0rem",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          paddingBottom: "0rem",
          borderRadius: "1rem",
          backgroundColor: "#181c1f",
          color: "white",
        }}
      >
        <SubplaceBody
          subplaceName={subplace}
          time={time}
          tags={tags}
          voteStatus={voteStatus}
          description={description}
          subplaceId={subplaceId}
          questionCount={questionCount}
        />
      </div>
    </>
  );
};

export default Subplace;
