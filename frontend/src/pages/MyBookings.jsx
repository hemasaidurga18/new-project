import React, { useEffect, useState } from 'react'

const MyBookings = () => {
  const [bookings, setBookings] = useState([])
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'))

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('bookings') || '[]')
    // Filter bookings by current user
    const userBookings = data.filter(booking => booking.userId === user?.id)
    setBookings(userBookings)
  }, [user])

  useEffect(() => {
    // Update user state when localStorage changes
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem('user') || 'null'))
      // Re-filter bookings when user changes
      const data = JSON.parse(localStorage.getItem('bookings') || '[]')
      const newUser = JSON.parse(localStorage.getItem('user') || 'null')
      const userBookings = data.filter(booking => booking.userId === newUser?.id)
      setBookings(userBookings)
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const handleCancelBooking = (index) => {
    if (window.confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
      const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]')
      const bookingToCancel = bookings[index]
      const updatedBookings = allBookings.filter(b => b.id !== bookingToCancel.id)
      localStorage.setItem('bookings', JSON.stringify(updatedBookings))
      setBookings(bookings.filter((_, i) => i !== index))
      alert('Booking cancelled successfully!')
    }
  }

  return (
    <div>
      <h2>My Bookings</h2>
      {bookings.length === 0 ? <p>No bookings yet.</p> : bookings.map((b, i) => (
        <div key={i} className='room-card booking-item'>
          <h3>{b.room.name}</h3>
          <p>Booked by: {b.name}</p>
          {b.isForFriend && <p>For friend: {b.friendName}</p>}
          <p>Check-in: {b.checkInDate}</p>
          <p>Check-out: {b.checkOutDate}</p>
          <p>Days: {b.days}</p>
          <p><strong>Total Price: ₹{b.room.price * b.days}</strong></p>
          <button
            onClick={() => handleCancelBooking(i)}
            className="cancel-btn"
          >
            Cancel Booking
          </button>
        </div>
      ))}
    </div>
  )
}

export default MyBookings
