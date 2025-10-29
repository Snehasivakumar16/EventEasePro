// frontend/src/components/Navbar.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext.jsx';

export default function Navbar() {
  const navigate = useNavigate();
  const { token, role, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout(); // Use the logout function from AuthContext
    navigate('/', { replace: true }); // Go to home page after logout
  };

  return (
    <nav className="nav">
      <div className="brand">EventEase Pro</div>
      <div className="nav-links">
        <Link to="/events">Events</Link>

        {!token ? (
          <>
            <Link to="/login">User Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/admin/login">Admin Login</Link>
          </>
        ) : (
          <>
            {role === 'admin' && <Link to="/admin">Admin Panel</Link>}
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
