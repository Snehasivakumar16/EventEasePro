import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Events from './pages/Events.jsx';
import BookingPage from './pages/BookingPage.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminPanel from './pages/AdminPanel.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/book/:id" element={<BookingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </>
  );
}
