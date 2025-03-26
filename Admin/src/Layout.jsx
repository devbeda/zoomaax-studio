import React from "react";
import Header from "./pages/Header";
import { Outlet } from "react-router-dom";
import SideHeader from "./pages/SideHeader";

function Layout() {
  return (
    <div>
      <Header />
      <SideHeader />
      <main>
        
          <Outlet />
        
      </main>
    </div>
  );
}

export default Layout;
