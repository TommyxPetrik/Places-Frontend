import { createContext, useContext, useState, useEffect } from "react";

const UserVotesContext = createContext();

export const useUserVotes = () => useContext(UserVotesContext);

export const UserVotesProvider = ({ children }) => {
  const [userVotes, setUserVotes] = useState(null);

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const res = await fetch("http://localhost:3000/users/getUserVotes");
        const data = await res.json();
        setUserVotes(data);
      } catch (e) {
        console.error("Error loading user votes", e);
      }
    };
    fetchVotes();
  }, []);

  return (
    <UserVotesContext.Provider value={userVotes}>
      {children}
    </UserVotesContext.Provider>
  );
};
