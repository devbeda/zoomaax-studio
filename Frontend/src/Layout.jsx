import React from "react";
import Header from "./component/Header";
import { Outlet } from "react-router-dom";
import Footer from "./component/Footer.jsx";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
