import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "./UserContext";
import Navbar from "./Navbar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { setUser } = useUserContext();

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", email);
        console.log(data.token);
        const userDetailsResponse = await fetch(
          `http://localhost:8080/api/users/details?email=${email}`
        );

        if (userDetailsResponse.ok) {
          const ud = await userDetailsResponse.json();
          localStorage.setItem("name", ud["username"]);
          localStorage.setItem("id", ud["id"]);
          console.log("Hello");
          setUser({ name: ud["name"], email: email, id: ud["id"] });
          navigate("/courses");
        } else {
          setError("An error occurred while fetching user details.");
        }
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div>
    <Navbar />

    <div className="d-flex justify-content-center mt-5">
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center text-primary mb-2">Welcome!</h3>
        <h4 className="text-center mb-6">Login</h4>

        <form autoComplete="off" onSubmit={login}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Id</label>
            <input
              type="email"
              id="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>

          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-success">Login</button>
          </div>
        </form>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="text-center mt-3">
          <small>
            Don't have an account?
            <Link to="/register" className="ms-1">Register Here</Link>
          </small>
        </div>
      </div>
    </div>
  </div>
  );
}
export default Login;
