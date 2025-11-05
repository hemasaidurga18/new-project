import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    studentId: '',
    course: ''
  })
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isLogin) {
        // Simulate login - in real app, this would call backend API
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
        const user = existingUsers.find(u => u.email === formData.email && u.password === formData.password)

        if (user) {
          const { password, ...userWithoutPassword } = user
          localStorage.setItem('user', JSON.stringify(userWithoutPassword))
          alert('Login successful!')
          window.dispatchEvent(new Event('userLogin'))
          navigate('/')
        } else {
          alert('Invalid email or password')
        }
      } else {
        // Simulate signup - in real app, this would call backend API
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')

        // Check if user already exists
        if (existingUsers.find(u => u.email === formData.email)) {
          alert('User already exists with this email')
          return
        }

        // Create new user
        const newUser = {
          id: Date.now(),
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          address: formData.address,
          studentId: formData.studentId,
          course: formData.course,
          createdAt: new Date().toISOString()
        }

        existingUsers.push(newUser)
        localStorage.setItem('users', JSON.stringify(existingUsers))

        // Set current user (without password)
        const { password, ...userWithoutPassword } = newUser
        localStorage.setItem('user', JSON.stringify(userWithoutPassword))

        alert('Account created successfully!')
        window.dispatchEvent(new Event('userLogin'))
        navigate('/')
      }
    } catch (error) {
      alert('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>{isLogin ? 'Login' : 'Create Account'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <label>Full Name:</label><br/>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required={!isLogin}
              /><br/>
            </>
          )}

          <label>Email:</label><br/>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          /><br/>

          <label>Password:</label><br/>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          /><br/>

          {!isLogin && (
            <>
              <label>Phone:</label><br/>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              /><br/>

              <label>Address:</label><br/>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows="3"
              /><br/>

              <label>Student ID:</label><br/>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleInputChange}
              /><br/>

              <label>Course:</label><br/>
              <input
                type="text"
                name="course"
                value={formData.course}
                onChange={handleInputChange}
              /><br/>
            </>
          )}

          <button type="submit" disabled={loading}>
            {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Create Account')}
          </button>
        </form>

        <p>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin)
              setFormData({
                name: '',
                email: '',
                password: '',
                phone: '',
                address: '',
                studentId: '',
                course: ''
              })
            }}
            className="link-button"
          >
            {isLogin ? 'Create Account' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  )
}

export default Login
