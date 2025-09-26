import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Hardcoded admin credentials
    const validEmail = 'admin@gmail.com';
    const validPassword = 'admin123';

    if (email === validEmail && password === validPassword) {
      setMessage('Login successful!');
      // Redirect to /dashboard after a short delay
      setTimeout(() => navigate('/dashboard'), 1000);
    } else {
      setMessage('Invalid Email or Password');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
    <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
      <h3 className="text-center mb-4">Admin Login</h3>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
      {message && (
        <div className={`alert mt-3 ${message === 'Login successful!' ? 'alert-success' : 'alert-danger'}`}>
          {message}
        </div>
      )}
    </div>
  </div>
  );
};

export default AdminLogin;
