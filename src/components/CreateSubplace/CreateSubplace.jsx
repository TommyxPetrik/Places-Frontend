import React, { useState } from "react";
import SubplaceName from "./SubplaceName";
import SubplaceDescription from "./SubplaceDescription";
import SubplaceAddTagsInput from "./SubplaceAddTagsInput";
import CreateSubplaceButton from "./CreateSubplaceButton";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CreateSubplace = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const [tagInput, setTagInput] = useState("");
  const [tagInputError, setTagInputError] = useState("");
  const [tags, setTags] = useState([]);

  const { user } = useAuth();
  const token = user?.token;
  const navigate = useNavigate();

  const handleNameBlur = () => {
    const rawName = name.replace(/^s\//, "");
    const nameRegex = /^[a-zA-Z0-9]{3,20}$/;

    if (!rawName) {
      setNameError("Name is required.");
    } else if (!nameRegex.test(rawName)) {
      setNameError(
        "Name must be 3-20 characters, no spaces or special characters."
      );
    } else {
      setNameError("");
    }
  };

  const handleDescriptionBlur = () => {
    if (!description) {
      setDescriptionError("Description is required.");
    } else if (description.length < 5 || description.length > 150) {
      setDescriptionError("Description must be 5-150 characters.");
    } else {
      setDescriptionError("");
    }
  };

  const handleTagInputBlur = () => {
    const regex = /^[a-zA-Z0-9_-]{3,10}$/;
    if (!tagInput) return;
    if (!regex.test(tagInput)) {
      setTagInputError("Tag must be 3-10 chars, no spaces or special chars.");
    } else {
      setTagInputError("");
    }
  };

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    const regex = /^[a-zA-Z0-9_-]{3,10}$/;

    if (trimmed && !tags.includes(trimmed) && regex.test(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
      setTagInputError("");
    } else if (!regex.test(trimmed)) {
      setTagInputError("Invalid tag format.");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const isFormValid =
    !nameError &&
    !descriptionError &&
    !tagInputError &&
    name &&
    description &&
    tags.length >= 3;

  const handleCreateSubplace = async () => {
    try {
      const response = await fetch("http://localhost:3000/subplace/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({
          name,
          description,
          tags,
        }),
      });

      if (!response.ok) {
        console.error("Failed to create subplace");
        return;
      }

      const fetchResponse = await fetch(
        `http://localhost:3000/subplace/name?name=${name}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        }
      );

      if (!fetchResponse.ok) {
        console.error("Failed to fetch subplace by name");
        return;
      }

      const subplace = await fetchResponse.json();
      console.log(subplace._id);

      navigate(`/subplace/${subplace._id}`);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="container">
      <h3 className="text-center text-white">Create Subplace</h3>

      <SubplaceName
        value={name}
        onChange={setName}
        onBlur={handleNameBlur}
        error={nameError}
      />

      <SubplaceDescription
        value={description}
        onChange={setDescription}
        onBlur={handleDescriptionBlur}
        error={descriptionError}
      />

      <SubplaceAddTagsInput
        value={tagInput}
        onChange={setTagInput}
        tags={tags}
        onRemoveTag={handleRemoveTag}
        handleAddTags={handleAddTag}
        onBlur={handleTagInputBlur}
        error={tagInputError}
      />

      <CreateSubplaceButton
        handleCreateSubplace={handleCreateSubplace}
        disabled={!isFormValid}
      />
    </div>
  );
};

export default CreateSubplace;
