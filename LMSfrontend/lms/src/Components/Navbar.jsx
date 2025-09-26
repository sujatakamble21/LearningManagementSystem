import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "./images/logo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faChalkboardUser } from "@fortawesome/free-solid-svg-icons";

function Navbar(props) {
  const value = props.page;
  const navigate = useNavigate();
  const authToken = localStorage.getItem("token");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("id");
    localStorage.removeItem("profileImage");
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div>
  <nav className="navbar navbar-expand-lg navbar-light bg-white">
    <div className="container-fluid">
      {/* Logo Section */}
      <div className="logo1">
        <img
          src={logo}
          alt="Logo"
          className="navbar-brand"
          style={{
            height: '50px', 
            width: 'auto', 
            marginRight: '15px', 
          }}
        />
      </div>

      {/* Mobile Menu Button */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
        onClick={toggleMobileMenu}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Navigation Links */}
      <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`} id="navbarNav">
        <ul className="navbar-nav ms-auto">
          {/* Home Link */}
          {value === "home" ? (
            <li className="nav-item active">
              <Link to="/" className="nav-link" style={{ fontSize: "20px" }}>
                Home
              </Link>
            </li>
          ) : (
            <li className="nav-item">
              <Link to="/" className="nav-link" style={{ fontSize: "20px" }}>
                Home
              </Link>
            </li>
          )}

          {/* Courses Link */}
          {value === "courses" ? (
            <li className="nav-item active">
              <Link to="/courses" className="nav-link" style={{ fontSize: "20px" }}>
                Courses
              </Link>
            </li>
          ) : (
            <li className="nav-item">
              <Link to="/courses" className="nav-link" style={{ fontSize: "20px" }}>
                Courses
              </Link>
            </li>
          )}

          {/* Profile Link (only visible when authenticated) */}
          {authToken ? (
            value === "profile" ? (
              <li className="nav-item active">
                <Link to="/profile" className="nav-link" style={{ fontSize: "20px" }}>
                  Profile
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link to="/profile" className="nav-link" style={{ fontSize: "20px" }}>
                  Profile
                </Link>
              </li>
            )
          ) : null}

          {/* Learnings Link (only visible when authenticated) */}
          {authToken ? (
            value === "learnings" ? (
              <li className="nav-item active">
                <Link to="/learnings" className="nav-link" style={{ fontSize: "20px" }}>
                  Learnings
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link to="/learnings" className="nav-link" style={{ fontSize: "20px" }}>
                  Learnings
                </Link>
              </li>
            )
          ) : null}

          {/* Sign Out / Login / Sign Up */}
          {authToken ? (
            <li className="nav-item">
              <button onClick={handleLogOut} className="btn btn-danger" style={{ fontSize: "18px" }}>
                Sign Out
              </button>
            </li>
          ) : (
            <li className="nav-item">
              <button onClick={() => navigate("/login")} className="btn btn-primary" style={{ fontSize: "18px" }}>
                Login/SignUp
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  </nav>

  {/* Horizontal Line Below Navbar */}
  <hr style={{ margin: "0", borderTop: "2px solid black", width: "100%" }} />
</div>

  

  );
}

export default Navbar;
