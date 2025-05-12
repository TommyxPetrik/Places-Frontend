import React from "react";

const ListGroup = ({ activeTab, setActiveTab }) => {
  const tabs = ["users", "subplaces", "questions", "answers"];

  return (
    <ul className="list-group">
      {tabs.map((tab) => (
        <li
          key={tab}
          className={`list-group-item list-group-item-action text-white`}
          onClick={() => setActiveTab(tab)}
          style={{
            backgroundColor: activeTab === tab ? "#141414" : "#343a40",
            cursor: "pointer",
            fontWeight: activeTab === tab ? "bold" : "normal",
            border: "none",
          }}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
