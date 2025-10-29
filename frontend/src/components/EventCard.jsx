import React from 'react';

function EventCard({ event }) {
  return (
    <div style={styles.card}>
      <h4>{event.name}</h4>
      <p>Date: {event.date}</p>
      <p>Location: {event.location}</p>
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '6px',
    padding: '10px',
    width: '200px',
    background: '#fafafa',
  },
};

export default EventCard;
