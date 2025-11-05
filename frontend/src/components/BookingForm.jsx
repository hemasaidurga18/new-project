import React, { useState } from 'react'
import PaymentForm from './PaymentForm'

const BookingForm = ({ selectedRoom, onConfirm }) => {
  const [name, setName] = useState('')
  const [days, setDays] = useState(1)
  const [isForFriend, setIsForFriend] = useState(false)
  const [friendName, setFriendName] = useState('')
  const [checkInDate, setCheckInDate] = useState('')
  const [checkOutDate, setCheckOutDate] = useState('')
  const [showPayment, setShowPayment] = useState(false)
  const [bookingData, setBookingData] = useState(null)

  const calculateTotal = () => {
    const daysDiff = Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24))
    return selectedRoom.price * (daysDiff || days)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const totalAmount = calculateTotal()
    const data = {
      room: selectedRoom,
      name,
      days,
      isForFriend,
      friendName: isForFriend ? friendName : '',
      checkInDate,
      checkOutDate,
      totalAmount
    }
    setBookingData(data)
    setShowPayment(true)
  }

  const handlePaymentSuccess = (paymentResult) => {
    alert('Payment successful! Your booking has been confirmed.');
    onConfirm({
      ...bookingData,
      paymentResult
    })
  }

  const handlePaymentError = (error) => {
    console.error('Payment error:', error)
    setShowPayment(false)
  }

  if (showPayment) {
    return (
      <div className="payment-section">
        <h2>Complete Payment</h2>
        <div className="booking-summary">
          <h3>Booking Summary</h3>
          <p>Room: {selectedRoom.name}</p>
          <p>Check-in: {checkInDate}</p>
          <p>Check-out: {checkOutDate}</p>
          <p>Total: ₹{bookingData.totalAmount}</p>
        </div>

        <PaymentForm
          amount={bookingData.totalAmount}
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentError={handlePaymentError}
        />

        <button
          type="button"
          onClick={() => setShowPayment(false)}
          className="back-btn"
        >
          Back to Booking Details
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Book Room: {selectedRoom.name}</h2>
      <label>Name:</label><br/>
      <input value={name} onChange={(e) => setName(e.target.value)} required /><br/>
      <label>Check-in Date:</label><br/>
      <input
        type="date"
        value={checkInDate}
        onChange={(e) => setCheckInDate(e.target.value)}
        required
      /><br/>
      <label>Check-out Date:</label><br/>
      <input
        type="date"
        value={checkOutDate}
        onChange={(e) => setCheckOutDate(e.target.value)}
        required
      /><br/>

      <div className="total-price">
        <strong>Total Price: ₹{calculateTotal()}</strong>
      </div>

      <label>
        <input
          type="checkbox"
          checked={isForFriend}
          onChange={(e) => setIsForFriend(e.target.checked)}
        />
        Book for a friend
      </label><br/>

      {isForFriend && (
        <>
          <label>Friend's Name:</label><br/>
          <input
            value={friendName}
            onChange={(e) => setFriendName(e.target.value)}
            required
          /><br/>
        </>
      )}

      <button type='submit'>Proceed to Payment</button>
    </form>
  )
}

export default BookingForm
