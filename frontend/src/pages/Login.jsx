import React, { useState, useContext, useEffect } from 'react';
import API from '../api';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext.jsx';
import './Auth.css';

const ADMIN_EMAIL = 'admin@eventease.com';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // clear autofill values when page loads
  useEffect(() => {
    setForm({ email: '', password: '' });
  }, []);

  const submit = async e => {
    e.preventDefault();

    if (form.email.trim().toLowerCase() === ADMIN_EMAIL) {
      alert('Please use the Admin Login page for admin credentials.');
      return;
    }

    try {
      const res = await API.post('/auth/login', form);
      const token = res.data.token;
      const role = res.data.user?.role || 'user';
      const email = res.data.user?.email || form.email;

      login({ token, role, email });
      navigate('/events');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>User Login</h2>

      {/* Dummy fields to disable Chrome autofill */}
      <input type="text" name="fakeuser" style={{ display: 'none' }} />
      <input type="password" name="fakepass" style={{ display: 'none' }} />

      <form onSubmit={submit} autoComplete="off">
        <input
          className="input"
          type="email"
          name="user_email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
          autoComplete="off"
        />
        <input
          className="input"
          type="password"
          name="user_password"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
          autoComplete="new-password"
        />
        <button className="btn" type="submit">
          Login
        </button>
      </form>

      <p className="auth-footer">
        Don’t have an account?{' '}
        <Link to="/register" className="auth-link">
          Register here
        </Link>
      </p>
    </div>
  );
}
