import React, { useEffect, useState } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    try {
      const res = await API.get('/events');
      setEvents(res.data);
    } catch (err) {
      alert('Cannot load events');
    }
  };

  return (
    <div>
      <h2>Upcoming Events</h2>
      <div className="grid">
        {events.map(ev => (
          <div className="card" key={ev._id}>
            <h3>{ev.title}</h3>
            <div className="small">Category: {ev.category}</div>
            <div className="small">
              Date: {new Date(ev.date).toLocaleString()}
            </div>
            <div className="small">Venue: {ev.venue}</div>
            <div className="small">Price: ₹{ev.price}</div>
            <div className="small">Available Seats: {ev.availableSeats}</div>
            <div className="row">
              <Link className="btn" to={`/book/${ev._id}`}>
                Book
              </Link>
              <a
                className="btn secondary"
                style={{ textDecoration: 'none' }}
                href={`http://localhost:5000/api/events/${ev._id}/forecast`}
                target="_blank"
                rel="noreferrer"
              >
                Forecast
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
