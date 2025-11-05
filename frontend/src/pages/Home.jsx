import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'))

  useEffect(() => {
    const checkUser = () => {
      setUser(JSON.parse(localStorage.getItem('user') || 'null'))
    }

    checkUser()

    window.addEventListener('userLogin', checkUser)

    return () => window.removeEventListener('userLogin', checkUser)
  }, [])

  return (
    <div className="homepage-background">
      <div className="hero-section">
        <h2>Welcome to Student Hostel Hub</h2>
        <p>Your perfect study space awaits. Find and book the best hostel rooms designed for students.</p>
        <div className="hero-buttons">
          <Link to='/rooms' className="cta-button">Browse Rooms</Link>
          {!user && <Link to='/login' className="secondary-button">Sign Up Today</Link>}
        </div>
      </div>

      <div className="features">
        <div className="feature">
          <div className="feature-icon">🏠</div>
          <h3>Comfortable Living</h3>
          <p>Modern hostel rooms with all amenities for focused studying</p>
        </div>
        <div className="feature">
          <div className="feature-icon">💰</div>
          <h3>Student Budget</h3>
          <p>Affordable rates perfect for students and budget travelers</p>
        </div>
        <div className="feature">
          <div className="feature-icon">📚</div>
          <h3>Study Environment</h3>
          <p>Quiet spaces and study areas designed for academic success</p>
        </div>
        <div className="feature">
          <div className="feature-icon">🤝</div>
          <h3>Community</h3>
          <p>Connect with fellow students and build lasting friendships</p>
        </div>
      </div>

      <div className="stats-section">
        <div className="stat">
          <div className="stat-number">500+</div>
          <div className="stat-label">Happy Students</div>
        </div>
        <div className="stat">
          <div className="stat-number">50+</div>
          <div className="stat-label">Hostel Rooms</div>
        </div>
        <div className="stat">
          <div className="stat-number">24/7</div>
          <div className="stat-label">Support</div>
        </div>
      </div>
    </div>
  )
}

export default Home
