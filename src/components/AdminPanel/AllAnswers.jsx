import React from "react";

const AllAnswers = ({ answers, handleVisit, handleDelete }) => {
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };
  return (
    <>
      <h4 className="mb-3">All Answers</h4>
      {Array.isArray(answers) && answers.length > 0 ? (
        answers.map((a) => (
          <div
            key={a._id}
            className="d-flex justify-content-between align-items-center border-bottom border-light py-2"
          >
            <div>
              <em title={a.body}>{truncateText(a.body, 50)}</em>
              <br />
              <small className="text-white">- {a.username}</small>
            </div>
            <div>
              <button
                className="btn btn-outline-light btn-sm me-2"
                onClick={() => handleVisit("answers", a.question._id)}
              >
                Visit
              </button>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => handleDelete("answers", a._id)}
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

export default AllAnswers;
