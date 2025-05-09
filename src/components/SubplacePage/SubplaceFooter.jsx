import React, { useState, useEffect } from "react";
import { useAuth } from "../../components/context/AuthContext";
import SubplaceJoinButton from "../SubplacePage/SubplaceJoinButton";
import SubplacePostsButton from "../SubplacePage/SubplacePostsButton";

const SubplaceFooter = ({
  joinStatus,
  questionCount,
  subplaceId,
  onRequireLogin,
  creator,
}) => {
  const { user } = useAuth();
  const token = user?.token;

  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    setIsJoined(joinStatus?.includes(subplaceId));
  }, [joinStatus, subplaceId]);

  const handleJoinToggle = async () => {
    if (!token) {
      onRequireLogin?.();
      return;
    }
    const endpoint = isJoined ? "leave" : "join";
    try {
      const response = await fetch(
        `http://localhost:3000/subplace/${endpoint}/${subplaceId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        }
      );

      if (response.ok) {
        setIsJoined(!isJoined);
      } else {
        console.error(`Failed to ${endpoint} subplace.`);
      }
    } catch (error) {
      console.error(`Error while trying to ${endpoint} subplace:`, error);
    }
  };

  return (
    <div className="card-footer bg-transparent border-0 p-0 mt-0">
      <div className="d-flex justify-content-between align-items-center mt-2">
        <div className="d-flex gap-2">
          <SubplaceJoinButton
            onClick={handleJoinToggle}
            isActive={isJoined}
            disabled={creator._id === user?.id}
          />
          <SubplacePostsButton
            subplaceId={subplaceId}
            questionCount={questionCount}
          />
        </div>
      </div>
    </div>
  );
};

export default SubplaceFooter;
