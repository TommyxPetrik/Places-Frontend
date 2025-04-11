import React from "react";
import ListGroup from "./ListGroup";
import ListgroupCreateFeed from "./ListGroupCreateFeed";
import ListgroupSubplaces from "./ListGroupSubplaces";

const SideBarBody = ({ isOpen, subplaces }) => {
  return (
    <div
      className={`offcanvas offcanvas-start ${isOpen ? "show" : ""}`}
      style={{
        backgroundColor: "rgb(24, 28, 31)",
        color: "white",
        width: "15rem",
        visibility: isOpen ? "visible" : "hidden",
        zIndex: 1045,
        transition: "transform 0.3s ease-in-out",
        transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        position: "fixed",
        top: "4rem",
        bottom: 0,
      }}
    >
      <div className="offcanvas-body scroll-container">
        <div className="d-flex flex-column align-items-start mb-3">
          <ListGroup
            first={"Home"}
            second={"Popular"}
            third={"Explore"}
            fourth={"All"}
          />
        </div>
        <div className="d-flex flex-column align-items-start mb-3">
          <ListgroupCreateFeed section={"Custom Feeds"} first={"Create post"} />
        </div>
        <div className="d-flex flex-column align-items-start mb-3">
          <ListgroupSubplaces
            section={"Subplaces"}
            first={"Create subplace"}
            subplaces={subplaces}
          />
        </div>
      </div>
    </div>
  );
};

export default SideBarBody;
