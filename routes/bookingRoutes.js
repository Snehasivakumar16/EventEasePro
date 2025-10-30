// import express from 'express';
// import { protect } from '../middleware/authMiddleware.js';
// import Event from '../models/Event.js';
// import Booking from '../models/Booking.js';

// const router = express.Router();

// // Book seats (users)
// router.post('/:id', protect, async (req, res) => {
//   try {
//     if (req.user.role === 'admin')
//       return res.status(403).json({ message: 'Admins cannot book' });

//     const seats = Number(req.body.seats) || 1;
//     if (seats <= 0) return res.status(400).json({ message: 'Invalid seats' });

//     // atomic update to prevent overbooking
//     const updated = await Event.findOneAndUpdate(
//       { _id: req.params.id, availableSeats: { $gte: seats } },
//       { $inc: { availableSeats: -seats, bookedSeats: seats } },
//       { new: true }
//     );

//     if (!updated) return res.status(400).json({ message: 'Not enough seats' });

//     await Booking.create({
//       userId: req.user.id,
//       eventId: req.params.id,
//       seats,
//     });
//     res.json({ message: 'Booking successful', event: updated });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// export default router;
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import Event from '../models/Event.js';
import Booking from '../models/Booking.js';

const router = express.Router();

// ✅ POST /api/bookings/:id → Book event seats
router.post('/:id', protect, async (req, res) => {
  try {
    if (req.user.role === 'admin') {
      return res.status(403).json({ message: 'Admins cannot book events' });
    }

    const seats = Number(req.body.seats) || 1;
    if (seats <= 0)
      return res.status(400).json({ message: 'Invalid number of seats' });

    // Atomic update to prevent overbooking
    const updatedEvent = await Event.findOneAndUpdate(
      { _id: req.params.id, availableSeats: { $gte: seats } },
      { $inc: { availableSeats: -seats, bookedSeats: seats } },
      { new: true }
    );

    if (!updatedEvent)
      return res
        .status(404)
        .json({ message: 'Event not found or not enough seats' });

    await Booking.create({
      userId: req.user.id,
      eventId: req.params.id,
      seats,
    });

    res.status(200).json({
      message: 'Booking successful!',
      event: updatedEvent,
    });
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
