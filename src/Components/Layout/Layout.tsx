import React from "react";
import Footer from "./Footer/Footer";
import SideNav from "./SideNav/SideNav";
import Header from "./Header/Header";

let Layout = ({ children }: { children: any }) => {
  return (
    <div className="wrapper">
      <Header />
      <SideNav />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
