import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import StripeProvider from './components/StripeProvider'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import RoomsPage from './pages/RoomsPage'
import MyBookings from './pages/MyBookings'
import Login from './pages/Login'
import Profile from './pages/Profile'
import './styles.css'

function App() {
  return (
    <StripeProvider>
      <Router>
        <Header />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<RoomsPage />} />
            <Route path="/bookings" element={<MyBookings />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </StripeProvider>
  )
}

export default App
