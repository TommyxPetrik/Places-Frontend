import { useState, useEffect } from "react";
import { useAuth } from "../components/context/AuthContext";
import { useNavigate } from "react-router-dom";
import ListGroup from "../components/AdminPanel/ListGroup";
import AllUsers from "../components/AdminPanel/AllUsers";
import AllSubplaces from "../components/AdminPanel/AllSubplaces";
import AllQuestions from "../components/AdminPanel/AllQuestions";
import AllAnswers from "../components/AdminPanel/AllAnswers";
import TwoFactorDelete from "../components/homePage/newsFeed/TwoFactorDelete";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [subplaces, setSubplaces] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState({ type: "", id: "" });

  const { user, loading } = useAuth();
  const token = user?.token;
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    const fetchData = async () => {
      try {
        const [usersRes, subplacesRes, questionsRes, answersRes] =
          await Promise.all([
            fetch("http://localhost:3000/users/getAll", {
              headers: { "x-access-token": token },
            }),
            fetch("http://localhost:3000/public/getAllSubplaces"),
            fetch("http://localhost:3000/public/getAllQuestions"),
            fetch("http://localhost:3000/answers/getAll", {
              headers: { "x-access-token": token },
            }),
          ]);

        const [usersData, subplacesData, questionsData, answersData] =
          await Promise.all([
            usersRes.json(),
            subplacesRes.json(),
            questionsRes.json(),
            answersRes.json(),
          ]);

        setUsers(usersData);
        setSubplaces(subplacesData);
        setQuestions(questionsData);
        setAnswers(answersData);
      } catch (err) {
        console.error("Error fetching admin data:", err);
      }
    };

    fetchData();
  }, [token, loading]);

  const handleDelete = async (type, id) => {
    const endpoints = {
      users: `http://localhost:3000/users/${id}`,
      subplaces: `http://localhost:3000/subplace/${id}`,
      questions: `http://localhost:3000/questions/${id}`,
      answers: `http://localhost:3000/answers/${id}`,
    };

    try {
      await fetch(endpoints[type], {
        method: "DELETE",
        headers: { "x-access-token": token },
      });

      if (type === "users") setUsers(users.filter((u) => u._id !== id));
      if (type === "subplaces")
        setSubplaces(subplaces.filter((s) => s._id !== id));
      if (type === "questions")
        setQuestions(questions.filter((q) => q._id !== id));
      if (type === "answers") setAnswers(answers.filter((a) => a._id !== id));
    } catch (err) {
      console.error(`Error deleting ${type}:`, err.message);
    }
  };

  const openDeleteModal = (type, id) => {
    setDeleteInfo({ type, id });
    setShowDeleteModal(true);
  };

  const handleVisit = (type, id) => {
    const routes = {
      users: `/profile/${id}`,
      subplaces: `/subplace/${id}`,
      questions: `/post/${id}`,
      answers: `/post/${id}`,
    };
    navigate(routes[type]);
  };

  return (
    <>
      {showDeleteModal && (
        <TwoFactorDelete
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => handleDelete(deleteInfo.type, deleteInfo.id)}
        />
      )}

      <div className="container my-5">
        <div className="card bg-dark text-white shadow-lg rounded-4 p-4">
          <div className="card-body">
            <h2 className="card-title mb-4">Admin Panel</h2>
            <div className="row">
              <div className="col-md-3 mb-4">
                <ListGroup activeTab={activeTab} setActiveTab={setActiveTab} />
              </div>

              <div className="col-md-9">
                <div className="bg-secondary bg-opacity-10 p-3 rounded">
                  {activeTab === "users" && (
                    <AllUsers
                      users={users}
                      handleVisit={handleVisit}
                      handleDelete={openDeleteModal}
                    />
                  )}
                  {activeTab === "subplaces" && (
                    <AllSubplaces
                      subplaces={subplaces}
                      handleVisit={handleVisit}
                      handleDelete={openDeleteModal}
                    />
                  )}
                  {activeTab === "questions" && (
                    <AllQuestions
                      questions={questions}
                      handleVisit={handleVisit}
                      handleDelete={openDeleteModal}
                    />
                  )}
                  {activeTab === "answers" && (
                    <AllAnswers
                      answers={answers}
                      handleVisit={handleVisit}
                      handleDelete={openDeleteModal}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
