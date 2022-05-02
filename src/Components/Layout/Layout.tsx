import React from 'react';
import Footer from './Footer/Footer';
import SideNav from './SideNav/SideNav';
import Header from './Header/Header'
import Dashboard from './Dashboard/Dashboard'

let Layout = () => {
    return (
        <div className='wrapper'>
            
            <Header />
            <SideNav />
           <Dashboard/>
            <Footer />
            
        </div>
    );
}

export default Layout;