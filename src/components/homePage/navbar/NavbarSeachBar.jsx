import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import onOutsideClick from "./onOutsideClick";

const NavbarSearchBar = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [allUsers, setAllUsers] = useState([]);
  const [allSubplaces, setAllSubplaces] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [allAnswers, setAllAnswers] = useState([]);

  const [results, setResults] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  onOutsideClick(wrapperRef, () => {
    setDropdownOpen(false);
  });

  const fetchAllData = async () => {
    try {
      const [usersRes, subplacesRes, questionsRes, answersRes] =
        await Promise.all([
          fetch("http://localhost:3000/public/getAllUsers"),
          fetch("http://localhost:3000/public/getAllSubplaces"),
          fetch("http://localhost:3000/public/getAllQuestions"),
          fetch("http://localhost:3000/public/getAllAnswers"),
        ]);

      const [users, subplaces, questions, answers] = await Promise.all([
        usersRes.json(),
        subplacesRes.json(),
        questionsRes.json(),
        answersRes.json(),
      ]);

      setAllUsers(users);
      setAllSubplaces(subplaces);
      setAllQuestions(questions);
      setAllAnswers(answers);
      setDataFetched(true);
    } catch (error) {
      console.error("Chyba pri načítaní dát:", error);
    }
  };

  const handleSearch = () => {
    if (!query.trim()) return;

    if (!dataFetched) {
      fetchAllData();
    }

    const lowerQuery = query.toLowerCase();
    let filtered = [];

    const match = (text) => text?.toLowerCase().includes(lowerQuery);

    if (category === "all" || category === "users") {
      filtered.push(
        ...allUsers
          .filter((u) => match(u.name))
          .map((u) => ({ ...u, type: "user" }))
      );
    }
    if (category === "all" || category === "subplaces") {
      filtered.push(
        ...allSubplaces
          .filter((s) => match(s.name))
          .map((s) => ({ ...s, type: "subplace" }))
      );
    }
    if (category === "all" || category === "questions") {
      filtered.push(
        ...allQuestions
          .filter((q) => match(q.title))
          .map((q) => ({ ...q, type: "question" }))
      );
    }
    if (category === "all" || category === "answers") {
      filtered.push(
        ...allAnswers
          .filter((a) => match(a.body))
          .map((a) => ({ ...a, type: "answer" }))
      );
    }

    setResults(filtered.slice(0, 10));
    setDropdownOpen(true);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setResults([]);
    setDropdownOpen(false);
  };

  const handleClickResult = (item) => {
    if (item.type === "user") {
      navigate(`/profile/${item._id}`);
    } else if (item.type === "subplace") {
      navigate(`/subplace/${item._id}`);
    } else if (item.type === "question") {
      navigate(`/post/${item._id}`);
    } else if (item.type === "answer") {
      navigate(`/post/${item.question?._id || item.question}`);
    }
    setDropdownOpen(false);
    setQuery("");
  };

  return (
    <div className="position-relative w-25" ref={wrapperRef}>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!dataFetched) fetchAllData();
          }}
          onFocus={() => results.length && setDropdownOpen(true)}
        />
        <button
          className="btn btn-outline-secondary text-white"
          onClick={handleSearch}
        >
          Search
        </button>
        <button
          className="btn btn-outline-secondary dropdown-toggle text-white"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
        <ul className="dropdown-menu">
          {["all", "users", "subplaces", "questions", "answers"].map((cat) => (
            <li key={cat}>
              <button
                className="dropdown-item"
                onClick={() => handleCategoryChange(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {dropdownOpen && results.length > 0 && (
        <ul
          className="dropdown-menu show w-100 mt-1 bg-dark"
          style={{ zIndex: 1050, maxHeight: "300px", overflowY: "auto" }}
        >
          {results.map((item, index) => (
            <li
              key={index}
              className="dropdown-item text-truncate bg-dark text-white"
              style={{ cursor: "pointer" }}
              onClick={() => handleClickResult(item)}
            >
              {item.type === "user" && `Profile: ${item.name}`}
              {item.type === "subplace" && `Subplace:  ${item.name}`}
              {item.type === "question" && `Post:  ${item.title}`}
              {item.type === "answer" && `Answer:  ${item.body}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NavbarSearchBar;
