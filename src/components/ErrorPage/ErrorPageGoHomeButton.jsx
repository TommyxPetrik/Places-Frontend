import { useNavigate } from "react-router-dom";

const ErrorPageGoHomeButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <button
      className="btn btn-outline-secondary text-white"
      onClick={handleClick}
    >
      Go home
    </button>
  );
};

export default ErrorPageGoHomeButton;
