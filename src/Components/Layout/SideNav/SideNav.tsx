import { fontStyle, fontWeight, style } from '@mui/system';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

let SideNav = () => {
  let isActive = true;
  return (
    <div>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="index3.html" className="brand-link">
          <img
            src="../logo.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: '.8' }}
          />
          <span className="brand-text font-weight-light">Ramya Boutique</span>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src="../dist/img/user2-160x160.jpg"
                className="img-circle elevation-2"
                alt="ramany"
              />
            </div>
            <div className="info">
              <a href="" className="d-block">
                Admin
              </a>
            </div>
          </div>
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* Add icons to the links using the .nav-icon class
           with font-awesome or any other icon font library */}

              <li className="nav-item ">
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive ? 'active nav-link' : 'nav-link'
                  }
                >
                  <i className="nav-icon fas fa-th" />
                  <p>Main Dashboard</p>
                </NavLink>
              </li>
              <hr style={{ borderTop: '1px solid #595959', width: '100%' }} />
              {/* <li className="nav-item has-treeview"> */}
              <li className={'nav-header'}>
                <b>CLOTHS</b>
              </li>
              {/* <ul className="nav nav-treeview"> */}
              <li className="nav-item">
                <NavLink
                  to="/viewCloths"
                  className={({ isActive }) =>
                    isActive ? 'active nav-link' : 'nav-link'
                  }
                >
                  <i className="far fa-circle nav-icon" />
                  <p>View Cloths</p>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/addCloth"
                  className={({ isActive }) =>
                    isActive ? 'active nav-link' : 'nav-link'
                  }
                >
                  <i className="far fa-circle nav-icon" />
                  <p>Add Cloth</p>
                </NavLink>
              </li>
              <hr style={{ borderTop: '1px solid #595959', width: '100%' }} />
              <li className="nav-header">
                <b>JEWELLERY</b>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/viewJewellerys"
                  className={({ isActive }) =>
                    isActive ? 'active nav-link' : 'nav-link'
                  }
                >
                  <i className="far fa-circle nav-icon" />
                  <p>View Jewelleries</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/addJewellery"
                  className={({ isActive }) =>
                    isActive ? 'active nav-link' : 'nav-link'
                  }
                >
                  <i className="far fa-circle nav-icon" />
                  <p>Add Jewellery</p>
                </NavLink>
              </li>
              <hr style={{ borderTop: '1px solid #595959', width: '100%' }} />

              <li className="nav-item">
                <NavLink
                  to="/categories"
                  className={({ isActive }) =>
                    isActive ? 'active nav-link' : 'nav-link'
                  }
                >
                  <i className="nav-icon far fa-calendar-alt" />
                  <p>Manage Categories</p>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/viewOrders"
                  className={({ isActive }) =>
                    isActive ? 'active nav-link' : 'nav-link'
                  }
                >
                  <i className="nav-icon fas fa-file" />
                  <p>Manage Orders</p>
                </NavLink>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    </div>
  );
};

export default SideNav;
