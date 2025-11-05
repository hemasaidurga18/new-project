import React, { useState } from 'react'
import rooms from '../data/rooms'
import RoomList from '../components/RoomList'
import BookingForm from '../components/BookingForm'
import CongratulationsModal from '../components/CongratulationsModal'

const RoomsPage = () => {
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [showCongratulations, setShowCongratulations] = useState(false)
  const [lastBooking, setLastBooking] = useState(null)

  const handleBook = (room) => setSelectedRoom(room)

  const handleConfirm = async (booking) => {
    try {
      // Here you would integrate with your backend API
      // For now, we'll simulate the booking process
      const user = JSON.parse(localStorage.getItem('user') || 'null')
      if (!user) {
        alert('Please login to book a room.')
        return
      }
      const existing = JSON.parse(localStorage.getItem('bookings') || '[]')
      const bookingWithId = {
        ...booking,
        id: Date.now(),
        userId: user.id,
        status: 'confirmed',
        paymentStatus: 'paid'
      }
      existing.push(bookingWithId)
      localStorage.setItem('bookings', JSON.stringify(existing))
      setLastBooking(bookingWithId)
      setSelectedRoom(null)
      setShowCongratulations(true)
    } catch (error) {
      console.error('Booking error:', error)
      alert('Booking failed. Please try again.')
    }
  }

  const handleCloseCongratulations = () => {
    setShowCongratulations(false)
    setLastBooking(null)
  }

  return (
    <div>
      {!selectedRoom && !showCongratulations && <RoomList rooms={rooms} onBook={handleBook} />}
      {selectedRoom && <BookingForm selectedRoom={selectedRoom} onConfirm={handleConfirm} />}
      {showCongratulations && lastBooking && (
        <CongratulationsModal
          booking={lastBooking}
          onClose={handleCloseCongratulations}
        />
      )}
    </div>
  )
}

export default RoomsPage
