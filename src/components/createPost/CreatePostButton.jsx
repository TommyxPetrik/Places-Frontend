import { useNavigate } from "react-router-dom";

const CreatePostPageButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/create");
  };

  return (
    <button
      className="btn btn-outline-secondary text-white"
      onClick={handleClick}
    >
      Create
    </button>
  );
};

export default CreatePostPageButton;
