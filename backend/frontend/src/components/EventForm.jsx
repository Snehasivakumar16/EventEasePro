import React, { useState } from 'react';

function EventForm({ onAdd }) {
  const [form, setForm] = useState({ name: '', date: '', location: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.date || !form.location) {
      alert('Please fill all fields!');
      return;
    }
    onAdd(form);
    setForm({ name: '', date: '', location: '' });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3>Add New Event</h3>
      <input
        type="text"
        name="name"
        placeholder="Event Name"
        value={form.name}
        onChange={handleChange}
        style={styles.input}
      />
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        style={styles.input}
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
        style={styles.input}
      />
      <button type="submit" style={styles.button}>
        Add Event
      </button>
    </form>
  );
}

const styles = {
  form: {
    border: '1px solid #ddd',
    padding: '15px',
    borderRadius: '8px',
    width: '300px',
    margin: 'auto',
  },
  input: {
    display: 'block',
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
  },
  button: {
    backgroundColor: '#1976d2',
    color: 'white',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default EventForm;
