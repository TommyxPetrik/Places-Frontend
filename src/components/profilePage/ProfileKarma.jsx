import React from "react";

const ProfileKarma = ({ karma }) => {
  return (
    <>
      <div className="col-md-6 mb-3">
        <strong>Karma:</strong> {karma}
      </div>
    </>
  );
};

export default ProfileKarma;
