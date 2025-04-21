import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import App from "./App.jsx";
import { UserVotesProvider } from "./context/UserVotesContext";

createRoot(document.getElementById("root")).render(
  <UserVotesProvider>
    <App />
  </UserVotesProvider>
);
