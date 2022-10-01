import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AuthService from '../../Services/AuthService';

let Login = ({ setToken }) => {
  const navigate = useNavigate();

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username && password) {
      AuthService.AutheticateUser({
        username,
        password,
      }).then((response) => {
        console.log(response.data);
        if (response.data.token) {
          setToken(response.data.token);
          navigate('/dashboard');
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Incorrect Username or Password',
            icon: 'warning',
            confirmButtonText: 'OK',
          });
        }
      });
    } else {
      Swal.fire({
        title: 'Something wrong',
        text: 'Mandatory fields are missing',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <body className="hold-transition login-page">
      <div className="login-box">
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <a className="h1">
              <b>Ramya Boutique</b> ADMIN
            </a>
          </div>
          <div className="card-body">
            <p className="login-box-msg">Sign in to start your session</p>
            <form method="post">
              <div className="input-group mb-3">
                <input
                  type="test"
                  className="form-control"
                  placeholder="Email"
                  onChange={(e) => setUserName(e.target.value)}
                ></input>
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope"></span>
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-8">
                  <div className="icheck-primary">
                    <input type="checkbox" id="remember"></input>
                    <label htmlFor="remember">Remember Me</label>
                  </div>
                </div>
              </div>
            </form>
            <div className="social-auth-links text-center mt-2 mb-3">
              <a href="#" className="btn btn-block btn-primary">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="btn btn-primary btn-block"
                >
                  Sign In
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Login;
