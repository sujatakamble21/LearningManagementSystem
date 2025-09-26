import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function RegistrationForm() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phno: "",
    password: "",
    dob: "",
    gender: "",
    location: "",
    eduaction: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/users/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Sending form data as JSON
      });

      if (response.status === 200) {
        console.log("Registration successful!");
        navigate("/login");
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      setError("Registration error:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="d-flex justify-content-center mt-5">
        <div className="card p-4 shadow" style={{ width: "700px" }}>
          <h3 className="text-center text-primary mb-4">User Registration</h3>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Name:</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Email Id:</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Phone No:</label>
                <input
                  type="tel"
                  className="form-control"
                  name="phno"
                  value={formData.phno}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Password:</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Date of Birth:</label>
                <input
                  type="date"
                  className="form-control"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Gender:</label>
                <div className="d-flex align-items-center gap-3 mt-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={formData.gender === "Male"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label">Male</label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={formData.gender === "Female"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Female</label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      value="Other"
                      checked={formData.gender === "Other"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Other</label>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label">Location:</label>
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Education:</label>
                <input
                  type="text"
                  className="form-control"
                  name="eduaction"
                  value={formData.eduaction}
                  onChange={handleChange}
                />
              </div>
            </div>

            {error && <div className="alert alert-danger mt-3">{error}</div>}

            <div className="d-grid mt-4">
              <button type="submit" className="btn btn-success">
                Register
              </button>
            </div>
          </form>

          <div className="text-center mt-3">
            <small>
              Already have an account?
              <Link to="/login" className="ms-1">
                Login Here
              </Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;
