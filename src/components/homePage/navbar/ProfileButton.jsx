import { useNavigate } from "react-router-dom";

const CreatePostPageButton = () => {
  //   const navigate = useNavigate();

  //   const handleClick = () => {
  //     navigate("/profile");
  //   };

  return (
    <button className="btn">
      <i
        className="bi bi-person-circle"
        style={{ fontSize: "1.5rem", color: "cornflowerblue" }}
      ></i>
    </button>
  );
};

export default CreatePostPageButton;
