const express = require('express');
const jwt = require('jsonwebtoken');
const Booking = require('../models/Booking');
const Room = require('../models/Room');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_your_stripe_secret_key_here');

const router = express.Router();

// Middleware to verify JWT token
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
    req.user = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Get user's bookings
router.get('/', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user })
      .populate('room')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create booking
router.post('/', auth, async (req, res) => {
  try {
    const { roomId, checkInDate, checkOutDate, guests } = req.body;

    // Check if room exists and is available
    const room = await Room.findById(roomId);
    if (!room || !room.available) {
      return res.status(400).json({ message: 'Room not available' });
    }

    // Calculate total price
    const days = Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24));
    const totalPrice = room.price * days;

    // Create booking
    const booking = new Booking({
      user: req.user,
      room: roomId,
      checkInDate,
      checkOutDate,
      guests,
      totalPrice
    });

    await booking.save();
    await booking.populate('room');

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get booking by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user
    }).populate('room');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Cancel booking
router.put('/:id/cancel', auth, async (req, res) => {
  try {
    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      { status: 'cancelled' },
      { new: true }
    ).populate('room');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create payment intent
router.post('/create-payment-intent', auth, async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe expects amount in cents
      currency: 'usd',
      metadata: {
        userId: req.user
      }
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    console.error('Payment intent creation error:', error);
    res.status(500).json({ message: 'Payment processing error' });
  }
});

// Confirm payment and create booking
router.post('/confirm-payment', auth, async (req, res) => {
  try {
    const { paymentIntentId, roomId, checkInDate, checkOutDate, guests } = req.body;

    // Verify payment intent
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({ message: 'Payment not completed' });
    }

    // Check if room exists and is available
    const room = await Room.findById(roomId);
    if (!room || !room.available) {
      return res.status(400).json({ message: 'Room not available' });
    }

    // Calculate total price
    const days = Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24));
    const totalPrice = room.price * days;

    // Create booking with payment details
    const booking = new Booking({
      user: req.user,
      room: roomId,
      checkInDate,
      checkOutDate,
      guests,
      totalPrice,
      paymentIntentId,
      paymentStatus: 'paid',
      paymentAmount: totalPrice,
      status: 'confirmed'
    });

    await booking.save();
    await booking.populate('room');

    res.status(201).json({
      booking,
      paymentStatus: 'success'
    });
  } catch (error) {
    console.error('Payment confirmation error:', error);
    res.status(500).json({ message: 'Booking confirmation error' });
  }
});

module.exports = router;
