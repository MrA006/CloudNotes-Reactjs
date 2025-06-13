import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserContext from "../context/users/createContext";

function Navbar(props) {
  let location = useLocation();
  const logged = localStorage.getItem('logged') === 'true';
  const userHandler = useContext(UserContext);
  const {signOut} = userHandler;
  const {showAlert} = props;

  const navi = useNavigate();

  const logOut = () =>{
    navi('/login');
    signOut();
    showAlert('logged out Successfully','success');
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          iNoteBook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">
                About
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`btn btn-primary mx-2 mb-2 ${logged?'d-none':''}`} to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`btn btn-primary ${logged?'d-none':''}`} to="/signup">
                SignUp
              </Link>
            </li>
            <li onClick={logOut} className={`nav-item btn btn-primary ${!logged?'d-none':''}`}>
                LogOut
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
