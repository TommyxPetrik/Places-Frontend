import React from "react";

const AllUsers = ({ users, handleVisit, handleDelete }) => {
  return (
    <>
      <h4 className="mb-3">All Users</h4>
      {Array.isArray(users) && users.length > 0 ? (
        users.map((u) => (
          <div
            key={u._id}
            className="d-flex justify-content-between align-items-center border-bottom border-light py-2"
          >
            <span>{u.name}</span>
            <div>
              <button
                className="btn btn-outline-light btn-sm me-2"
                onClick={() => handleVisit("users", u._id)}
              >
                Visit
              </button>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => handleDelete("users", u._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-2">Žiadne dostupné dáta</div>
      )}
    </>
  );
};

export default AllUsers;
