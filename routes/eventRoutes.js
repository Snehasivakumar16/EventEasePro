import express from 'express';
import Event from '../models/Event.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ Get all events
router.get('/', async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

// ✅ Create event (Admin)
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const { title, category, date, venue, price, totalSeats } = req.body;
    if (!title || !category || !date || !venue || !price || !totalSeats) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const event = await Event.create({
      title,
      category,
      date,
      venue,
      price,
      totalSeats,
      availableSeats: totalSeats,
      bookedSeats: 0,
    });

    res.status(201).json(event);
  } catch (err) {
    console.error('Create event error:', err);
    res.status(500).json({ message: 'Server error creating event' });
  }
});

// ✅ Update event (Admin)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const { title, category, date, venue, price, totalSeats } = req.body;
    event.title = title;
    event.category = category;
    event.date = date;
    event.venue = venue;
    event.price = price;
    event.availableSeats = totalSeats - event.bookedSeats;
    await event.save();

    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Delete event (Admin)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: 'Event not found' });
  await event.deleteOne();
  res.json({ message: 'Event deleted' });
});

// ✅ Demand Forecast (AI logic)
router.get('/:id/forecast', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const ratio =
      event.availableSeats > 0
        ? event.bookedSeats / (event.bookedSeats + event.availableSeats)
        : 0;

    let forecast = 'Low demand expected';
    if (ratio > 0.8)
      forecast = 'High demand expected! Consider adding more seats.';
    else if (ratio > 0.5) forecast = 'Moderate demand — selling well.';
    else forecast = 'Low demand — consider promotions.';

    res.json({
      eventId: event._id,
      title: event.title,
      forecast,
      ratio: ratio.toFixed(2),
    });
  } catch (err) {
    console.error('Forecast error:', err);
    res.status(500).json({ message: 'Server error during forecast' });
  }
});

export default router;
