import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BlogContext } from "./../../../../Context/Blog/blogContext";

const NavbarBody = ({ classOne, classTwo }) => {
  const { getCurrentUser, logout } = useContext(BlogContext);
  return (
    <React.Fragment>
      <div className={`${classOne}`} id="navbarResponsive">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              <i className="fa fa-home" /> Home
            </Link>
          </li>

          {!getCurrentUser() && (
            <React.Fragment>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </React.Fragment>
          )}
          {getCurrentUser() && (
            <React.Fragment>
              <li
                onClick={() => {
                  logout();
                }}
                className="nav-item"
              >
                <Link className="nav-link" to="/logout">
                  Logout
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/new">
                  New Post
                </Link>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default NavbarBody;
