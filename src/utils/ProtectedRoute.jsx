import { Navigate } from "react-router-dom";
import { useAuth } from "../components/context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const token = user?.token;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/SignIn" replace />;
  }

  return children;
};

export default ProtectedRoute;
