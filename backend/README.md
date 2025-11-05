# Hostel Booking Backend

A Node.js/Express backend API for a hostel room booking platform.

## Features

- User authentication (register/login)
- Room management
- Booking system
- JWT authentication
- MongoDB database

## Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with:
   ```
   MONGODB_URI=mongodb://localhost:27017/hostel-booking
   JWT_SECRET=your-secret-key
   PORT=5000
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Rooms
- `GET /api/rooms` - Get all available rooms
- `GET /api/rooms/:id` - Get room by ID
- `POST /api/rooms` - Create room (admin)
- `PUT /api/rooms/:id` - Update room (admin)
- `DELETE /api/rooms/:id` - Delete room (admin)

### Bookings
- `GET /api/bookings` - Get user's bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/:id` - Get booking by ID
- `PUT /api/bookings/:id/cancel` - Cancel booking

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- CORS
