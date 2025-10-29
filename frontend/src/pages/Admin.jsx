import React, { useEffect, useState } from 'react';
import API from '../api';

export default function Admin() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: '',
    category: '',
    date: '',
    venue: '',
    price: 0,
    totalSeats: 0,
  });

  const load = async () => {
    try {
      const res = await API.get('/events');
      setEvents(res.data);
    } catch (e) {
      alert('Load failed');
    }
  };
  useEffect(() => load(), []);

  const create = async e => {
    e.preventDefault();
    try {
      await API.post('/events', form);
      setForm({
        title: '',
        category: '',
        date: '',
        venue: '',
        price: 0,
        totalSeats: 0,
      });
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Create failed');
    }
  };

  const remove = async id => {
    if (!confirm('Delete event?')) return;
    try {
      await API.delete(`/events/${id}`);
      load();
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <form className="form" onSubmit={create}>
        <input
          className="input"
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          className="input"
          placeholder="Category"
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
          required
        />
        <input
          className="input"
          type="datetime-local"
          value={form.date}
          onChange={e => setForm({ ...form, date: e.target.value })}
          required
        />
        <input
          className="input"
          placeholder="Venue"
          value={form.venue}
          onChange={e => setForm({ ...form, venue: e.target.value })}
          required
        />
        <input
          className="input"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={e => setForm({ ...form, price: Number(e.target.value) })}
        />
        <input
          className="input"
          type="number"
          placeholder="Total Seats"
          value={form.totalSeats}
          onChange={e =>
            setForm({ ...form, totalSeats: Number(e.target.value) })
          }
          required
        />
        <button className="btn">Create Event</button>
      </form>

      <h3>Existing Events</h3>
      <div className="grid">
        {events.map(ev => (
          <div className="card" key={ev._id}>
            <strong>{ev.title}</strong>
            <div className="small">
              Available: {ev.availableSeats} / {ev.totalSeats}
            </div>
            <div style={{ marginTop: 8 }}>
              <button className="btn" onClick={() => remove(ev._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
