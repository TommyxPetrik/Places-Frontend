import React, { useState, useEffect } from "react";
import SelectSubplace from "../createPost/SelectSubplace";
import Questiontitle from "../createPost/QuestionTitle";
import QuestionBody from "../createPost/QuestionBody";
import SelectTags from "../createPost/SelectTags";
import CreatePostFormButton from "../createPost/CreatePostFormButton";
import { useAuth } from "../context/AuthContext";

const CreatePost = () => {
  const [selectedTag, setSelectedTag] = useState("");
  const [tags, setTags] = useState([]);
  const [questiontitle, setQuestiontitle] = useState("");
  const [questionbody, setQuestionbody] = useState("");
  const [selectedSubplace, setSelectedSubplace] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const token = user?.token;

  const handleCreatePost = async () => {
    let subplace;
    try {
      console.log(token);

      const response = await fetch(
        `http://localhost:3000/subplace/name?name=${selectedSubplace}`,
        {
          method: "GET",
          headers: {
            "x-access-token": token,
          },
        }
      );
      subplace = await response.json();
    } catch (error) {
      console.error("Error fetching subplace:", error.mesage);
    }

    const postData = {
      subplace: subplace._id,
      title: questiontitle,
      body: questionbody,
      tags: tags,
    };

    try {
      const response = await fetch("http://localhost:3000/questions/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) throw new Error("Failed to create post");

      const result = await response.json();
      console.log("Post created:", result);
    } catch (error) {
      console.error("Error fetching question:", error.mesage);
    }
  };

  const handleSelectChange = (e) => {
    const tag = e.target.value;

    if (tag !== "Select Tags" && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }

    setSelectedTag("Select Tags");
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <>
      <div className="" style={{ width: "30rem" }}>
        <SelectSubplace
          value={selectedSubplace}
          onChange={setSelectedSubplace}
        />
        <Questiontitle value={questiontitle} onChange={setQuestiontitle} />
        <QuestionBody value={questionbody} onChange={setQuestionbody} />

        <SelectTags
          selectedTag={selectedTag}
          tags={tags}
          handleSelectChange={handleSelectChange}
          handleRemoveTag={handleRemoveTag}
        />
        <CreatePostFormButton handleCreatePost={handleCreatePost} />
      </div>
    </>
  );
};

export default CreatePost;
