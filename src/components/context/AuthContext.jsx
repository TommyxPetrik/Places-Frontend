import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const id = localStorage.getItem("id");
    const role = localStorage.getItem("role");

    if (token && email && id) {
      setUser({ token, email, id });
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("token", userData.token);
    localStorage.setItem("email", userData.email);
    localStorage.setItem("id", userData.id);
    localStorage.setItem("role", userData.role);
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
