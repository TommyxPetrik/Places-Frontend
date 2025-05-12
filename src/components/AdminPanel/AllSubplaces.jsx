import React from "react";

const AllSubplaces = ({ subplaces, handleVisit, handleDelete }) => {
  return (
    <>
      <h4 className="mb-3">All Subplaces</h4>
      {Array.isArray(subplaces) && subplaces.length > 0 ? (
        subplaces.map((s) => (
          <div
            key={s._id}
            className="d-flex justify-content-between align-items-center border-bottom border-light py-2"
          >
            <span>{s.name}</span>
            <div>
              <button
                className="btn btn-outline-light btn-sm me-2"
                onClick={() => handleVisit("subplaces", s._id)}
              >
                Visit
              </button>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => handleDelete("subplaces", s._id)}
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

export default AllSubplaces;
