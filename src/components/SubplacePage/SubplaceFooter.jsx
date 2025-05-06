import React, { useState } from "react";
import { useAuth } from "../../components/context/AuthContext";
import SubplaceJoinButton from "../SubplacePage/SubplaceJoinButton";
import SubplacePostsButton from "../SubplacePage/SubplacePostsButton";

const SubplaceFooter = ({ voteStatus, questionCount, subplaceId }) => {
  const { user } = useAuth();
  const token = user?.token;

  const [isJoined, setIsJoined] = useState(false);

  const handleJoinClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/subplace/join/${subplaceId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        }
      );

      if (response.ok) {
        console.log("Successfully joined subplace.");
        setIsJoined(true);
      } else {
        console.error("Failed to join subplace.");
      }
    } catch (error) {
      console.error("Error while joining subplace:", error);
    }
  };

  return (
    <div className="card-footer bg-transparent border-0 p-0 mt-0">
      <div className="d-flex justify-content-between align-items-center mt-2">
        <div className="d-flex gap-2">
          <SubplaceJoinButton onClick={handleJoinClick} isActive={isJoined} />
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
