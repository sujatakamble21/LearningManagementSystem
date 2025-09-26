import React from "react";
import { Link } from "react-router-dom";
import img1 from "../images/user.png"

function SideBar(props){
    const { current } = props;
    return(
      <div id="sidebar" className="border-end bg-white p-3" style={{ width: "290px", minHeight: "100vh" }}>
      <div className="mb-4">
        <Link to="/dashboard" className="text-decoration-none d-flex align-items-center">
          <img src={img1} alt="Logo" style={{ width: "35px", marginRight: "10px" }} />
          <span className="fw-semibold text-dark fs-5">LMS Admin</span>
        </Link>
      </div>
      <ul className="nav flex-column bg-white">
        <li className="nav-item">
          <Link to="/dashboard" className={`nav-link ${current === "dashboard" ? "active text-primary" : "text-dark"}`}>
            <i className="bx bxs-dashboard me-2"></i> Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/Dusers" className={`nav-link ${current === "user" ? "active text-primary" : "text-dark"}`}>
            <i className="bx bxs-group me-2"></i> Users
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/DCourses" className={`nav-link ${current === "courses" ? "active text-primary" : "text-dark"}`}>
            <i className="bx bxs-book me-2"></i> Courses
          </Link>
        </li>
      </ul>
    </div>
    );
}

export default SideBar