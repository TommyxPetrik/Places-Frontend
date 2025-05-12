import React from "react";

const AllQuestions = ({ questions, handleVisit, handleDelete }) => {
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };
  return (
    <>
      <h4 className="mb-3">All Questions</h4>
      {Array.isArray(questions) && questions.length > 0 ? (
        questions.map((q) => (
          <div
            key={q._id}
            className="d-flex justify-content-between align-items-center border-bottom border-light py-2"
          >
            <div>
              <strong title={q.title}>{truncateText(q.title, 50)}</strong>
              <br />
              <small className="text-white">- {q.username}</small>
            </div>
            <div>
              <button
                className="btn btn-outline-light btn-sm me-2"
                onClick={() => handleVisit("questions", q._id)}
              >
                Visit
              </button>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => handleDelete("questions", q._id)}
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

export default AllQuestions;
