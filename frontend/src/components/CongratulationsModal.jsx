import React from 'react'

const CongratulationsModal = ({ booking, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content congratulations-modal">
        <div className="modal-header">
          <h2>🎉 Congratulations!</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="celebration-icon">🎊</div>
          <h3>Your booking has been confirmed!</h3>
          <div className="booking-details">
            <p><strong>Room:</strong> {booking.room.name}</p>
            <p><strong>Booked by:</strong> {booking.name}</p>
            {booking.isForFriend && <p><strong>For friend:</strong> {booking.friendName}</p>}
            <p><strong>Check-in:</strong> {booking.checkInDate}</p>
            <p><strong>Check-out:</strong> {booking.checkOutDate}</p>
            <p><strong>Duration:</strong> {booking.days} days</p>
            <p><strong>Total Price:</strong> ₹{booking.room.price * booking.days}</p>
          </div>
          <div className="booking-message">
            <p>Thank you for choosing our hostel! We look forward to welcoming you.</p>
            <p>You can view all your bookings in the "My Bookings" section.</p>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-primary" onClick={onClose}>Continue</button>
        </div>
      </div>
    </div>
  )
}

export default CongratulationsModal
