import React from 'react';

let Footer = () => {
  return (
    <div>
      <footer className="main-footer">
        <strong>
          Copyright © {new Date().getFullYear()}{' '}
          <a href="https://admin.theramyaboutique.com/">Ramya Boutique</a>.
        </strong>{' '}
        All rights reserved.
        {/* <div className="float-right d-none d-sm-inline-block">
            <b>Version</b> 1.0.0
          </div> */}
      </footer>
    </div>
  );
};

export default Footer;
