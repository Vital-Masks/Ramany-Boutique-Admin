import React from 'react';
import { Link } from 'react-router-dom'

let SideNav = ()=>{
    return(
        <div>
  <aside className="main-sidebar sidebar-dark-primary elevation-4">
    {/* Brand Logo */}
    <a href="index3.html" className="brand-link">
      <img src="../dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
      <span className="brand-text font-weight-light">Ramany Boutique</span>
    </a>
    {/* Sidebar */}
    <div className="sidebar">
      {/* Sidebar user panel (optional) */}
      <div className="user-panel mt-3 pb-3 mb-3 d-flex">
        <div className="image">
          <img src="../dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="ramany" />
        </div>
        <div className="info">
          <a href="index3.html" className="d-block">Yathushan</a>
        </div>
      </div>
      {/* Sidebar Menu */}
      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          {/* Add icons to the links using the .nav-icon class
           with font-awesome or any other icon font library */}
         
          <li className="nav-item ">
            <Link to="/" className="nav-link">
              <i className="nav-icon fas fa-th" />
              <p>
              Main Dashboard   
              </p>
            </Link>
          </li>
          <li className="nav-item has-treeview">
            <a href="index3.html" className="nav-link">
            
              <i className="nav-icon fas fa-copy" />
              <p>
              Products
                <i className="fas fa-angle-left right" />
                
              </p>
            </a>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <Link to="/viewCloths" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>View Products</p>
                </Link>
              </li>
              <li className="nav-item">
              <Link to="/addCloth" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Add Product</p>
                </Link>
              </li>        
            </ul>
          </li>
          <li className="nav-item has-treeview">
            <a href="index3.html" className="nav-link">
            
              <i className="nav-icon fas fa-copy" />
              <p>
              Jewellery
                <i className="fas fa-angle-left right" />
                
              </p>
            </a>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <Link to="/viewJewellerys" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>View Jewelleries</p>
                </Link>
              </li>
              <li className="nav-item">
              <Link to="/addJewellery" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Add Jewellery</p>
                </Link>
              </li>        
            </ul>
          </li>
         
          {/* <li className="nav-header">Category</li> */}
          <li className="nav-item">
            <Link to="/categories"className="nav-link">
              <i className="nav-icon far fa-calendar-alt" />
              <p>
                Manage Categories
                {/* <span className="badge badge-info right">2</span> */}
              </p>
              </Link>
          </li>
         
          {/* <li className="nav-header">Manage Orders</li> */}
          <li className="nav-item">
            <a className="nav-link">
              <i className="nav-icon fas fa-file" />
              <p>Manage Orders</p>
            </a>
          </li>
          <li className="nav-header">Multi Level Analytics</li>
          <li className="nav-item">
            <a href="index3.html" className="nav-link">
              <i className="fas fa-circle nav-icon" />
              <p>Level 1</p>
            </a>
          </li>
          <li className="nav-item has-treeview">
            <a href="index3.html" className="nav-link">
              <i className="nav-icon fas fa-circle" />
              <p>
                Level 1
                <i className="right fas fa-angle-left" />
              </p>
            </a>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <a href="index3.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Level 2</p>
                </a>
              </li>
              <li className="nav-item has-treeview">
                <a href="index3.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>
                    Level 2
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="index3.html" className="nav-link">
                      <i className="far fa-dot-circle nav-icon" />
                      <p>Level 3</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="index3.html" className="nav-link">
                      <i className="far fa-dot-circle nav-icon" />
                      <p>Level 3</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="index3.html" className="nav-link">
                      <i className="far fa-dot-circle nav-icon" />
                      <p>Level 3</p>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a href="index3.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Level 2</p>
                </a>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <a href="index3.html" className="nav-link">
              <i className="fas fa-circle nav-icon" />
              <p>Level 1</p>
            </a>
          </li>
          <li className="nav-header">LABELS</li>
          <li className="nav-item">
            <a href="index3.html" className="nav-link">
              <i className="nav-icon far fa-circle text-danger" />
              <p className="text">Important</p>
            </a>
          </li>
          <li className="nav-item">
            <a href="index3.html" className="nav-link">
              <i className="nav-icon far fa-circle text-warning" />
              <p>Warning</p>
            </a>
          </li>
          <li className="nav-item">
            <a href="index3.html" className="nav-link">
              <i className="nav-icon far fa-circle text-info" />
              <p>Informational</p>
            </a>
          </li>
        </ul>
      </nav>
      {/* /.sidebar-menu */}
    </div>
    {/* /.sidebar */}
  </aside>
</div>
    );
}

export default SideNav;