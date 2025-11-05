import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'))

  useEffect(() => {
    const checkUser = () => {
      setUser(JSON.parse(localStorage.getItem('user') || 'null'))
    }

    checkUser()

    window.addEventListener('userLogin', checkUser)

    return () => window.removeEventListener('userLogin', checkUser)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    window.location.reload()
  }

  return (
    <header>
      <h1>🏨 Student Hostel Room Booking</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/rooms">Rooms</Link>
        {user ? (
          <>
            <Link to="/bookings">My Bookings</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  )
}

export default Header
