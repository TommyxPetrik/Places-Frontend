import { Navigate } from "react-router-dom";
import { useAuth } from "../components/context/AuthContext";

const ProtectedRouteAdmin = ({ children }) => {
  const { user, loading } = useAuth();
  const token = user?.token;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user.role.toString() !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRouteAdmin;
