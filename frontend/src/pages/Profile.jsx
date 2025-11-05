import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UserSettings from '../components/UserSettings'

const Profile = () => {
  const [user, setUser] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [studentId, setStudentId] = useState('')
  const [course, setCourse] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || 'null')
    if (!userData) {
      navigate('/login')
      return
    }
    setUser(userData)
    setName(userData.name || '')
    setEmail(userData.email || '')
    setPhone(userData.phone || '')
    setAddress(userData.address || '')
    setStudentId(userData.studentId || '')
    setCourse(userData.course || '')
  }, [navigate])

  const handleSave = () => {
    const updatedUser = { ...user, name, email, phone, address, studentId, course }
    localStorage.setItem('user', JSON.stringify(updatedUser))
    setUser(updatedUser)
    setIsEditing(false)

    // Update user in users array
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
    const userIndex = existingUsers.findIndex(u => u.id === user.id)
    if (userIndex !== -1) {
      existingUsers[userIndex] = { ...existingUsers[userIndex], ...updatedUser }
      localStorage.setItem('users', JSON.stringify(existingUsers))
    }

    alert('Profile updated successfully!')
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  if (!user) return <div>Loading...</div>

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <div className="profile-layout">
        <div className="profile-card">
          <div className="profile-avatar">
            <span>👤</span>
          </div>
          {isEditing ? (
            <div className="profile-edit">
              <label>Name:</label><br/>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              /><br/>
              <label>Email:</label><br/>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              /><br/>
              <label>Phone:</label><br/>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              /><br/>
              <label>Address:</label><br/>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows="3"
              /><br/>
              <label>Student ID:</label><br/>
              <input
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              /><br/>
              <label>Course:</label><br/>
              <input
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              /><br/>
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          ) : (
            <div className="profile-info">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone || 'Not provided'}</p>
              <p><strong>Address:</strong> {user.address || 'Not provided'}</p>
              <p><strong>Student ID:</strong> {user.studentId || 'Not provided'}</p>
              <p><strong>Course:</strong> {user.course || 'Not provided'}</p>
              <button onClick={() => setIsEditing(true)}>Edit Profile</button>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          )}
        </div>

        <div className="settings-card">
          <UserSettings user={user} onUpdateUser={setUser} />
        </div>
      </div>
    </div>
  )
}

export default Profile
