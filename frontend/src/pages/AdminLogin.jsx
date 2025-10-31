import React, { useState, useContext, useEffect } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext.jsx';
import './Auth.css';

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // Clear autofill values on load
  useEffect(() => {
    setForm({ email: '', password: '' });
  }, []);

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      const token = res.data.token;
      const role = res.data.user?.role || 'admin';
      const email = res.data.user?.email || form.email;

      login({ token, role, email });
      navigate('/admin');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Admin Login</h2>

      {/* Hidden dummy fields to prevent browser autofill */}
      <input type="text" name="fakeadminuser" style={{ display: 'none' }} />
      <input type="password" name="fakeadminpass" style={{ display: 'none' }} />

      <form onSubmit={submit} autoComplete="off">
        <input
          className="input"
          type="email"
          name="admin_email"
          placeholder="Admin Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
          autoComplete="off"
        />
        <input
          className="input"
          type="password"
          name="admin_password"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
          autoComplete="new-password"
        />
        <button className="btn" type="submit">
          Admin Login
        </button>
      </form>

      <p className="auth-footer">
        Default admin: admin@eventease.com / Admin@123
      </p>
    </div>
  );
}
