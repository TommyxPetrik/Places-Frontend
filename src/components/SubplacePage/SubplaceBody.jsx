import React from "react";
import PostBodyText from "../homePage/newsFeed/PostBodyText";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import SubplaceFooter from "./SubplaceFooter";
import SubplaceBodyText from "./SubplaceBodyText";

const SubplaceBody = ({
  time,
  tags,
  joinStatus,
  subplaceId,
  description,
  subplaceName,
  questionCount,
  onRequireLogin,
  creator,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/subplace/${subplaceId}`);
  };

  return (
    <div>
      <div
        onClick={handleClick}
        className="card-body d-flex flex-column"
        style={{ height: "100%", cursor: "pointer", width: "35rem" }}
      >
        <SubplaceBodyText
          subplaceName={subplaceName}
          time={time}
          description={description}
          tags={tags}
          creator={creator}
        />
      </div>
      <div>
        <SubplaceFooter
          subplaceId={subplaceId}
          joinStatus={joinStatus}
          questionCount={questionCount}
          onRequireLogin={onRequireLogin}
          creator={creator}
        />
      </div>
    </div>
  );
};

export default SubplaceBody;
