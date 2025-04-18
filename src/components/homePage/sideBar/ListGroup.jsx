import React from "react";
import HomePageButton from "./HomePageButton";
import PopularPageButton from "./PopularPageButton";
import ExplorePageButton from "./ExplorePageButton";
import { th } from "date-fns/locale";
import AllPageButton from "./AllPageButton";

const ListGroup = ({ first, second, third, fourth }) => {
  return (
    <>
      <div
        className="card bg-dark"
        style={{ width: "12rem", padding: "0rem", maxWidth: "14rem" }}
      >
        <ul className="list-group list-group-flush">
          <HomePageButton first={first} />
          <PopularPageButton second={second} />
          <ExplorePageButton third={third} />
          <AllPageButton fourth={fourth} />
        </ul>
      </div>
    </>
  );
};

export default ListGroup;
