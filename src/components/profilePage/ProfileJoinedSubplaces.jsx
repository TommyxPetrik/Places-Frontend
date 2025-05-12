import React from "react";

const ProfileJoinedSubplaces = ({ subplaces, onVisitSubplace }) => {
  return (
    <>
      <>
        <hr className="border-light mt-3" />
        <h5 className="mt-3">Joined Subplaces</h5>
        <ul className="list-group list-group-flush">
          {subplaces && subplaces.length > 0 ? (
            subplaces.map((sub, index) => (
              <li
                key={index}
                className="list-group-item bg-dark text-white d-flex justify-content-between align-items-center"
              >
                {sub.name}
                <button
                  onClick={() => onVisitSubplace(sub._id)}
                  className="btn btn-sm btn-primary"
                >
                  Visit
                </button>
              </li>
            ))
          ) : (
            <li className="list-group-item bg-dark text-white">
              No joined subplaces.
            </li>
          )}
        </ul>
      </>
    </>
  );
};

export default ProfileJoinedSubplaces;
