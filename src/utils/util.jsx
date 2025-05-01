import { redirect } from "react-router-dom";

export const getAuthToken = () => {
  console.log("tokenloader");
  const token = localStorage.getItem("token");
  return token;
};

export const tokenLoader = () => {
  return getAuthToken();
};

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/SignIn");
  }
  return 0;
}
