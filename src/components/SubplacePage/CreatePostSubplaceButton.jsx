import { useNavigate } from "react-router-dom";

const CreatePosSubplacePageButton = () => {
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

export default CreatePosSubplacePageButton;
