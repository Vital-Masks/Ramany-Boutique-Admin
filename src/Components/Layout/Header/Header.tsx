let Header = () => {
  const logout = async (e) => {
    e.preventDefault();
    sessionStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="index3.html">
              <i className="fas fa-bars" />
            </a>
          </li>
        </ul>
        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a
              style={{ cursor: 'pointer' }}
              className="nav-link"
              onClick={logout}
              data-widget="control-sidebar"
              data-slide="true"
            >
              <i className="fa-sharp fa-solid fa-arrow-right-from-bracket" />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
