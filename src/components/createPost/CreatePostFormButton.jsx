import { useNavigate } from "react-router-dom";

const CreatePostFormButton = ({ handleCreatePost, disabled }) => {
  return (
    <button
      className="btn btn-outline-secondary text-white mt-2"
      onClick={handleCreatePost}
      disabled={disabled}
    >
      Create
    </button>
  );
};

export default CreatePostFormButton;
