import React from "react";
import { Outlet } from "react-router-dom";
import { MenuProvider } from "../../../context/menuContext";

function MenuLayout() {
  return (
    <MenuProvider>
      <Outlet />
    </MenuProvider>
  );
}

export default MenuLayout;
