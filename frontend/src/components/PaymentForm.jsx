import React, { useState } from 'react';

const PaymentForm = ({ amount, onPaymentSuccess, onPaymentError }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!phoneNumber) {
      setPaymentError('Please enter your phone number.');
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);

    try {
      // Simulate payment processing with phone number
      // In a real app, this would integrate with a payment gateway that supports phone-based payments
      setTimeout(() => {
        setIsProcessing(false);
        onPaymentSuccess && onPaymentSuccess({
          paymentIntentId: 'pi_phone_' + Date.now(),
          status: 'succeeded',
          phoneNumber: phoneNumber
        });
      }, 2000);

    } catch (error) {
      setPaymentError('Payment failed. Please try again.');
      setIsProcessing(false);
      onPaymentError && onPaymentError('Payment failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <div className="payment-form-group">
        <label htmlFor="phone-number">Phone Number for Payment</label>
        <input
          type="tel"
          id="phone-number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter your phone number"
          required
          className="phone-input"
        />
      </div>

      {paymentError && (
        <div className="payment-error">
          {paymentError}
        </div>
      )}

      <button
        type="submit"
        disabled={isProcessing}
        className="payment-submit-btn"
      >
        {isProcessing ? 'Processing...' : `Pay ₹${amount}`}
      </button>
    </form>
  );
};

export default PaymentForm;
