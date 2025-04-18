import React, { use, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/homePage/navbar/Navbar";
import SidebarLeft from "../components/homePage/sideBar/SidebarLeft";

const RootLayout = () => {
  const [cachedSubplaces, setcachedSubplaces] = useState(null);
  return (
    <>
      <Navbar />
      <SidebarLeft
        cachedSubplaces={cachedSubplaces}
        setcachedSubplaces={setcachedSubplaces}
      />
      <Outlet />
    </>
  );
};

export default RootLayout;
