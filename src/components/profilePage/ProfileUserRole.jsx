import React from "react";

const ProfileUserRole = ({ userrole }) => {
  return (
    <>
      <div className="col-md-6 mb-3">
        <strong>User Role:</strong> {userrole}
      </div>
    </>
  );
};

export default ProfileUserRole;
