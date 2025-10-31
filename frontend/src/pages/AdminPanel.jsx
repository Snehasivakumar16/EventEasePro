import React, { useState, useEffect } from 'react';
// import jwtDecode from 'jwt-decode';
import API from '../api';
import './AdminPanel.css';

export default function AdminPanel() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: '',
    category: '',
    date: '',
    venue: '',
    price: '',
    totalSeats: '',
  });
  const [editId, setEditId] = useState(null); // ✅ track which event is being edited

  const token = localStorage.getItem('token');

  // 🧭 Fetch events
  const fetchEvents = async () => {
    try {
      const res = await API.get('/events');
      setEvents(res.data);
    } catch (err) {
      console.error('Error loading events:', err);
      alert('Failed to load events — check if backend is running');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // 🧾 Handle add or update
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editId) {
        // ✏️ Update existing event
        await API.put(`/events/${editId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('✅ Event updated successfully!');
      } else {
        // ➕ Create new event
        await API.post('/events', form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('✅ Event created successfully!');
      }

      // Reset form
      setForm({
        title: '',
        category: '',
        date: '',
        venue: '',
        price: '',
        totalSeats: '',
      });
      setEditId(null);
      fetchEvents();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Operation failed');
    }
  };

  // 🗑️ Delete
  const handleDelete = async id => {
    if (!window.confirm('Are you sure to delete this event?')) return;
    try {
      await API.delete(`/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchEvents();
    } catch {
      alert('Delete failed');
    }
  };

  // 🖊️ Edit button click
  const handleEdit = event => {
    setEditId(event._id);
    setForm({
      title: event.title,
      category: event.category,
      date: event.date.slice(0, 16), // format for datetime-local
      venue: event.venue,
      price: event.price,
      totalSeats: event.availableSeats + event.bookedSeats,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 🧩 Categories
  const categories = [
    'Music',
    'Comedy',
    'Conference',
    'Festival',
    'Health',
    'Movie',
    'Workshop',
    'Sports',
    'Others',
  ];

  return (
    <div className="admin-container">
      <h2 className="admin-title">{editId ? 'Edit Event' : 'Admin Panel'}</h2>

      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <input
            placeholder="Title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            required
          />

          <select
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
            required
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
            type="datetime-local"
            value={form.date}
            onChange={e => setForm({ ...form, date: e.target.value })}
            required
          />

          <input
            placeholder="Venue"
            value={form.venue}
            onChange={e => setForm({ ...form, venue: e.target.value })}
            required
          />

          <input
            type="number"
            placeholder="Price (₹)"
            value={form.price}
            onChange={e => setForm({ ...form, price: e.target.value })}
            required
          />

          <input
            type="number"
            placeholder="Total Seats"
            value={form.totalSeats}
            onChange={e => setForm({ ...form, totalSeats: e.target.value })}
            required
          />
        </div>

        <button type="submit" className="add-btn">
          {editId ? 'Update Event' : 'Add Event'}
        </button>

        {editId && (
          <button
            type="button"
            className="cancel-btn"
            onClick={() => {
              setEditId(null);
              setForm({
                title: '',
                category: '',
                date: '',
                venue: '',
                price: '',
                totalSeats: '',
              });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <div className="event-list">
        {events.map(ev => (
          <div key={ev._id} className="event-card">
            <div className="event-header">
              <h3>{ev.title}</h3>
              <span className="category-tag">{ev.category}</span>
            </div>
            <p>
              <strong>Date:</strong> {new Date(ev.date).toLocaleString()}
            </p>
            <p>
              <strong>Venue:</strong> {ev.venue}
            </p>
            <p>
              <strong>Price:</strong> ₹{ev.price}
            </p>
            <p>
              <strong>Seats:</strong> {ev.bookedSeats}/
              {ev.availableSeats + ev.bookedSeats}
            </p>
            <div className="event-actions">
              <button className="edit-btn" onClick={() => handleEdit(ev)}>
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(ev._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
