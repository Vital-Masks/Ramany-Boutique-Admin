import React from 'react';
import Footer from './Footer/Footer';
import SideNav from './SideNav/SideNav';
import Header from './Header/Header';

let Layout = ({ children, auth }: { children: any; auth: boolean }) => {
  return (
    <div className="wrapper">
      {auth ? (
        <>
          <Header />
          <SideNav />
          {children}
          <Footer />
        </>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

export default Layout;
