// frontend/src/pages/Register.jsx
import React, { useState, useContext } from 'react';
import API from '../api';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext.jsx';
import './Auth.css'; // import the CSS for clean style

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', form);
      const token = res.data.token;
      const role = res.data.user?.role || 'user';
      const email = res.data.user?.email || form.email;

      login({ token, role, email });
      navigate('/events');
    } catch (err) {
      alert(err.response?.data?.message || 'Register failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Create an Account</h2>
      <form onSubmit={submit}>
        <input
          className="input"
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
          autoComplete="off"
        />
        <input
          className="input"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
          autoComplete="off"
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
          autoComplete="new-password"
        />
        <button className="btn" type="submit">
          Register
        </button>
      </form>

      <p className="auth-footer">
        Already have an account?{' '}
        <Link to="/login" className="auth-link">
          Login here
        </Link>
      </p>
    </div>
  );
}
