import React, { useState, useEffect } from "react";
import SelectSubplace from "../createPost/SelectSubplace";

const CreatePost = () => {
  const [selectedTag, setSelectedTag] = useState("");
  const [tags, setTags] = useState([]);
  const [questiontitle, setQuestiontitle] = useState("");
  const [questionbody, setquestionbody] = useState("");
  const [selectedSubplace, setSelectedSubplace] = useState("");
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:3000/questions/create`, {
  //         method: "POST",
  //       });
  //       const data = await response.json();
  //       setPost(data);
  //     } catch (error) {
  //       console.error("Error fetching posts:", error.mesage);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchPosts();
  // }, []);

  const handleCreatePost = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/subplace/name?name=${selectedSubplace}`,
        {
          method: "GET",
        }
      );
      const subplace = await response.json();
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
        {/* <SelectSubplace /> */}
        <div>
          <label htmlFor="subplace" className="form-label text-white">
            Select Subplace
          </label>
          <select
            className="form-select"
            aria-label="Default select example"
            id="subplace"
            value={selectedSubplace}
            onChange={(e) => setSelectedSubplace(e.target.value)}
          >
            <option>Select Subplace</option>
            <option value="s/Test 3">s/Test 3</option>
            <option value="s/subplace 1">s/subplace 1</option>
            <option value="s/subplace 12">s/subplace 12</option>
            <option value="s/subplace 13">s/subplace 13</option>
          </select>
        </div>
        <div>
          <label htmlFor="questiontitle" className="form-label text-white">
            Question Title
          </label>
          <input
            className="form-control form-control-lg"
            type="text"
            id="questiontitle"
            value={questiontitle}
            onChange={(e) => setQuestiontitle(e.target.value)}
            placeholder="Question Title"
            aria-label=".form-control-lg example"
          ></input>
        </div>

        <div className="mb-3">
          <label htmlFor="questionbody" className="form-label text-white">
            Question Body
          </label>
          <textarea
            className="form-control"
            id="questionbody"
            value={questionbody}
            onChange={(e) => setquestionbody(e.target.value)}
            rows="3"
            placeholder="Here you can type your whole question"
          ></textarea>
        </div>

        <div className="align-items-center d-flex justify-content-center gap-2 mb-3">
          <select
            className="form-select"
            aria-label="Default select example"
            value={selectedTag}
            onChange={handleSelectChange}
          >
            <option>Select Tags</option>
            <option value="First one">First one</option>
            <option value="React">React</option>
            <option value="Javascript">Javascript</option>
          </select>
        </div>

        <div className="d-flex flex-wrap gap-2 justify-content-center">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="badge bg-primary d-flex align-items-center gap-1"
              style={{ padding: "0.6em 1em" }}
            >
              {tag}
              <button
                type="button"
                className="btn-close btn-close-white btn-sm ms-2"
                aria-label="Close"
                onClick={() => handleRemoveTag(tag)}
              ></button>
            </span>
          ))}
        </div>
        <button
          className="btn btn-outline-secondary text-white mt-3"
          onClick={handleCreatePost}
        >
          Create
        </button>
      </div>
    </>
  );
};

export default CreatePost;
