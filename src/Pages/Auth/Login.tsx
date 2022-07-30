import React, { useRef, useState, useEffect, useContext } from 'react';
import { Link, Navigate } from "react-router-dom";
import PropTypes from 'prop-types';
import AuthService from '../../Services/AuthService'
import AuthContext from '../../Context/AuthProvider'


let Login = ({setToken}) => {

    // const { setAuth } : any = useContext(AuthContext);
    // const userRef = useRef();
    // const errRef = useRef();

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // useEffect(() => {
    //     userRef.current.focus();
    // }, [])

    // useEffect(() => {
    //     setErrMsg('');
    // }, [username, password])

    // const [loggedInUser, setloggedInUser] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();
        AuthService.AutheticateUser({
            username,
            password
        }).then(response => {
            if(response.data.token){
                // setloggedInUser(response)
                setToken(response.data.token)
                // setAuth({ username });
              return <Navigate to="/dashboard" replace={true} />
                
            }
            else{

            }
            
        })
    }

    return (
        <body className="hold-transition login-page">
            <div className="login-box">

                <div className="card card-outline card-primary">
                    <div className="card-header text-center">
                        <a className="h1"><b>Ramany Boutique</b> ADMIN</a>
                    </div>
                    <div className="card-body">
                        <p className="login-box-msg">Sign in to start your session</p>
                        <form method="post">
                            <div className="input-group mb-3">
                                <input type="test" className="form-control" placeholder="Email" onChange={e => setUserName(e.target.value)} ></input>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" className="form-control" placeholder="Password" onChange={e => setPassword(e.target.value)}></input>
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
                                        <label htmlFor="remember">
                                            Remember Me
                                        </label>
                                    </div>
                                </div>


                            </div>
                        </form>
                        <div className="social-auth-links text-center mt-2 mb-3">
                            <a href="#" className="btn btn-block btn-primary">
                                <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-block">Sign In</button>
                            </a>
                        </div>

                        <p className="mb-1">
                            <a href="forgot-password.html">I forgot my password</a>
                        </p>
                    </div>

                </div>

            </div>
        </body>
    );
}

export default Login;