import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';
import { AuthContext } from '../AuthContext.jsx';

export default function BookingPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [seats, setSeats] = useState(1);
  const navigate = useNavigate();
  const { token, role } = useContext(AuthContext);

  useEffect(() => {
    loadEvent();
  }, [id]);

  // 🟩 Load single event
  const loadEvent = async () => {
    try {
      const res = await API.get('/events');
      const found = res.data.find(e => e._id === id);
      if (found) setEvent(found);
      else alert('Event not found');
    } catch (err) {
      console.error(err);
      alert('Failed to load event');
    }
  };

  // 🟩 Book event seats
  const handleBook = async () => {
    try {
      if (!token) {
        if (window.confirm('You must login to book — go to login page?')) {
          navigate('/login');
        }
        return;
      }

      if (role === 'admin') {
        alert('Admins cannot book events. Please login as a user.');
        return;
      }

      // ✅ Include Authorization header
      const res = await API.post(
        `/bookings/${id}`,
        { seats },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert(res.data.message || 'Booking successful!');
      await loadEvent(); // Refresh event data after booking
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Booking failed');
    }
  };

  if (!event) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <div className="card">
        <h3>{event.title}</h3>
        <p>
          <strong>Venue:</strong> {event.venue}
        </p>
        <p>
          <strong>Date:</strong> {new Date(event.date).toLocaleString()}
        </p>
        <p>
          <strong>Available Seats:</strong> {event.availableSeats}
        </p>
        <p>
          <strong>Price:</strong> ₹{event.price}
        </p>

        <div style={{ marginTop: 12 }}>
          <input
            className="input"
            type="number"
            min="1"
            max={event.availableSeats}
            value={seats}
            onChange={e => setSeats(Number(e.target.value))}
          />
          <button
            className="btn"
            onClick={handleBook}
            disabled={event.availableSeats <= 0}
            style={{ marginLeft: 8 }}
          >
            Book {seats}
          </button>
        </div>
      </div>
    </div>
  );
}
