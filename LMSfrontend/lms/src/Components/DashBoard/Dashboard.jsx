import React, { useState, useEffect } from 'react';
import './dstyle.css';
import SideBar from './SideBar';
import Navbar from './Navbar';

function Dashboard() {
  const [userscount, setUserscount] = useState(0);
  const [coursescount, setCoursescount] = useState(0);
  const [enrolled, setEnrolled] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8080/api/users")
      .then((res) => res.json())
      .then((data) => setUserscount(data.length))
      .catch((err) => console.error("Error fetching users:", err));

    fetch("http://localhost:8080/api/courses")
      .then((res) => res.json())
      .then((data) => setCoursescount(data.length))
      .catch((err) => console.error("Error fetching courses:", err));

    fetch("http://localhost:8080/api/learning")
      .then((res) => res.json())
      .then((data) => setEnrolled(data.length))
      .catch((err) => console.error("Error fetching enrollments:", err));
  }, []);

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
  <SideBar current={"dashboard"} />
  <section id="content">
    <Navbar />
    <main className="container-fluid py-4">
      <div className="row mb-4">
        <div className="col">
          <h1 id="dashboard" className="text-dark">Dashboard</h1>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="border rounded p-4 bg-white shadow-sm d-flex align-items-center">
            <i className='bx bxs-group fs-1 me-3 text-success'></i>
            <div>
              <h4 className="mb-0">{userscount}</h4>
              <small className="text-muted">Total Users</small>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="border rounded p-4 bg-white shadow-sm d-flex align-items-center">
            <i className='bx bx-book fs-1 me-3 text-info'></i>
            <div>
              <h4 className="mb-0">{coursescount}</h4>
              <small className="text-muted">Total Courses</small>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="border rounded p-4 bg-white shadow-sm d-flex align-items-center">
            <i className='bx bxs-calendar-check fs-1 me-3 text-warning'></i>
            <div>
              <h4 className="mb-0">{enrolled}</h4>
              <small className="text-muted">Total Enrollment</small>
            </div>
          </div>
        </div>
      </div>
    </main>
  </section>
</div>


  );
}

export default Dashboard;
