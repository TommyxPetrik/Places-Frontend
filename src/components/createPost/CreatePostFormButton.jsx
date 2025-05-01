import { useNavigate } from "react-router-dom";

const CreatePostFormButton = ({ handleCreatePost }) => {
  return (
    <button
      className="btn btn-outline-secondary text-white mt-2"
      onClick={handleCreatePost}
    >
      Create
    </button>
  );
};

export default CreatePostFormButton;
