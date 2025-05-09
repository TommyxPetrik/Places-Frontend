import React, { useState, useEffect } from "react";
import SelectSubplace from "../createPost/SelectSubplace";
import Questiontitle from "../createPost/QuestionTitle";
import QuestionBody from "../createPost/QuestionBody";
import SelectTags from "../createPost/SelectTags";
import CreatePostFormButton from "../createPost/CreatePostFormButton";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [selectedSubplace, setSelectedSubplace] = useState("");
  const [subplaceError, setSubplaceError] = useState("");

  const [questiontitle, setQuestiontitle] = useState("");
  const [titleError, setTitleError] = useState("");

  const [questionbody, setQuestionbody] = useState("");
  const [bodyError, setBodyError] = useState("");

  const [selectedTag, setSelectedTag] = useState("");
  const [tags, setTags] = useState([]);
  const [tagsError, setTagsError] = useState("");

  const [availableTags, setAvailableTags] = useState([]);
  const [allSubplaces, setAllSubplaces] = useState([]);
  const { user } = useAuth();
  const token = user?.token;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubplaces = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/users/getJoinedSubplaces",
          {
            headers: { "x-access-token": token },
          }
        );
        const data = await response.json();
        setAllSubplaces(data);
      } catch (error) {
        console.error("Error loading subplaces:", error.message);
      }
    };
    fetchSubplaces();
  }, []);

  useEffect(() => {
    const fetchTags = async () => {
      if (!selectedSubplace) return setAvailableTags([]);
      try {
        const res = await fetch(
          `http://localhost:3000/subplace/name?name=${selectedSubplace}`,
          {
            headers: { "x-access-token": token },
          }
        );
        const data = await res.json();
        setAvailableTags(data.tags || []);
      } catch {
        setAvailableTags([]);
      }
    };
    fetchTags();
  }, [selectedSubplace]);

  const handleSelectChange = (e) => {
    const tag = e.target.value;
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTagsError("");
    }
    setSelectedTag("");
  };

  const handleRemoveTag = (tagToRemove) => {
    const updated = tags.filter((t) => t !== tagToRemove);
    setTags(updated);
    if (updated.length < 3) setTagsError("Please select at least 3 tags.");
  };

  const handleSubplaceBlur = () => {
    setSubplaceError(!selectedSubplace ? "Subplace is required." : "");
  };

  const handleTitleBlur = () => {
    if (!questiontitle) {
      setTitleError("Title is required.");
    } else if (questiontitle.length < 5 || questiontitle.length > 100) {
      setTitleError("Title must be 5–100 characters.");
    } else {
      setTitleError("");
    }
  };

  const handleBodyBlur = () => {
    if (!questionbody) {
      setBodyError("Body is required.");
    } else if (questionbody.length < 10 || questionbody.length > 300) {
      setBodyError("Body must be 10–300 characters.");
    } else {
      setBodyError("");
    }
  };

  const handleTagsBlur = () => {
    if (tags.length < 1) {
      setTagsError("Please select at least 1 tag.");
    } else {
      setTagsError("");
    }
  };

  const isFormValid =
    !subplaceError &&
    !titleError &&
    !bodyError &&
    !tagsError &&
    selectedSubplace &&
    questiontitle &&
    questionbody &&
    tags.length >= 1;

  const handleCreatePost = async () => {
    if (!isFormValid) return;

    try {
      const subplaceRes = await fetch(
        `http://localhost:3000/subplace/name?name=${selectedSubplace}`,
        {
          headers: { "x-access-token": token },
        }
      );
      const subplaceData = await subplaceRes.json();

      const res = await fetch("http://localhost:3000/questions/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({
          subplace: subplaceData._id,
          title: questiontitle,
          body: questionbody,
          tags,
        }),
      });

      if (!res.ok) throw new Error("Failed to create post");

      const fetchCreated = await fetch(
        `http://localhost:3000/questions/title?title=${questiontitle}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        }
      );
      const createdQuestion = await fetchCreated.json();

      if (createdQuestion && createdQuestion._id) {
        navigate(`/post/${createdQuestion._id}`);
      } else {
        console.error("Question not found after creation");
      }
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  return (
    <div style={{ width: "30rem" }}>
      <SelectSubplace
        value={selectedSubplace}
        onChange={setSelectedSubplace}
        onBlur={handleSubplaceBlur}
        error={subplaceError}
        options={allSubplaces}
      />
      <Questiontitle
        value={questiontitle}
        onChange={setQuestiontitle}
        onBlur={handleTitleBlur}
        error={titleError}
      />
      <QuestionBody
        value={questionbody}
        onChange={setQuestionbody}
        onBlur={handleBodyBlur}
        error={bodyError}
      />
      <SelectTags
        availableTags={availableTags}
        selectedTag={selectedTag}
        tags={tags}
        handleSelectChange={handleSelectChange}
        handleRemoveTag={handleRemoveTag}
        onBlur={handleTagsBlur}
        error={tagsError}
      />
      <CreatePostFormButton
        handleCreatePost={handleCreatePost}
        disabled={!isFormValid}
      />
    </div>
  );
};

export default CreatePost;
