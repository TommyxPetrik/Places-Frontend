import React, { useState } from "react";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="btn btn-outline-dark position-fixed"
        type="button"
        onClick={toggleSidebar}
        style={{
          backgroundColor: "rgb(24, 28, 31)",
          top: "5rem",
          left: isOpen ? "14.5rem" : "0.5rem", 
          zIndex: 1051,
          borderColor: "#444",
        }}
      >
        <i
          className={`bi ${isOpen ? "bi-arrow-left" : "bi-list"}`}
          style={{ fontSize: "1rem", color: "white" }}
        ></i>
      </button>

      <div
        className={`offcanvas offcanvas-start ${isOpen ? "show" : ""}`}
        style={{
          backgroundColor: "rgb(24, 28, 31)",
          color: "white",
          width: "16rem",
          visibility: isOpen ? "visible" : "hidden",
          zIndex: 1045,
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          position: "fixed",
          top: "4rem",
          bottom: 0,
        }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Sidebar</h5>
        </div>
        <div className="offcanvas-body">
          <p>Tu je obsah sidebaru.</p>
          <p>Môžeš sem dať navigáciu, odkazy alebo čokoľvek.</p>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
