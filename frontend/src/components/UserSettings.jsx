import React, { useState, useEffect } from 'react'

const UserSettings = ({ user, onUpdateUser }) => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    bookingReminders: true,
    newsletter: false,
    language: 'en',
    theme: 'light',
    privacy: 'public'
  })

  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem(`settings_${user?.id}`) || 'null')
    if (savedSettings) {
      setSettings(savedSettings)
    }
  }, [user])

  const handleSettingChange = (setting, value) => {
    const newSettings = { ...settings, [setting]: value }
    setSettings(newSettings)
    localStorage.setItem(`settings_${user?.id}`, JSON.stringify(newSettings))
  }

  const handleExportData = () => {
    const userData = {
      profile: user,
      bookings: JSON.parse(localStorage.getItem('bookings') || '[]').filter(b => b.name === user?.name),
      settings: settings
    }

    const dataStr = JSON.stringify(userData, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)

    const exportFileDefaultName = `user-data-${user?.name || 'user'}.json`

    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // Remove user from users array
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
      const updatedUsers = existingUsers.filter(u => u.id !== user?.id)
      localStorage.setItem('users', JSON.stringify(updatedUsers))

      // Remove user data
      localStorage.removeItem('user')
      localStorage.removeItem(`settings_${user?.id}`)

      // Remove user's bookings
      const bookings = JSON.parse(localStorage.getItem('bookings') || '[]')
      const updatedBookings = bookings.filter(b => b.name !== user?.name)
      localStorage.setItem('bookings', JSON.stringify(updatedBookings))

      alert('Account deleted successfully')
      window.location.reload()
    }
  }

  return (
    <div className="user-settings">
      <h3>Account Settings</h3>

      <div className="settings-section">
        <h4>Notifications</h4>
        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
            />
            Email Notifications
          </label>
        </div>
        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              checked={settings.smsNotifications}
              onChange={(e) => handleSettingChange('smsNotifications', e.target.checked)}
            />
            SMS Notifications
          </label>
        </div>
        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              checked={settings.bookingReminders}
              onChange={(e) => handleSettingChange('bookingReminders', e.target.checked)}
            />
            Booking Reminders
          </label>
        </div>
        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              checked={settings.newsletter}
              onChange={(e) => handleSettingChange('newsletter', e.target.checked)}
            />
            Newsletter Subscription
          </label>
        </div>
      </div>

      <div className="settings-section">
        <h4>Preferences</h4>
        <div className="setting-item">
          <label>Language:</label>
          <select
            value={settings.language}
            onChange={(e) => handleSettingChange('language', e.target.value)}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>
        <div className="setting-item">
          <label>Theme:</label>
          <select
            value={settings.theme}
            onChange={(e) => handleSettingChange('theme', e.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
          </select>
        </div>
        <div className="setting-item">
          <label>Profile Privacy:</label>
          <select
            value={settings.privacy}
            onChange={(e) => handleSettingChange('privacy', e.target.value)}
          >
            <option value="public">Public</option>
            <option value="friends">Friends Only</option>
            <option value="private">Private</option>
          </select>
        </div>
      </div>

      <div className="settings-section">
        <h4>Data & Privacy</h4>
        <div className="setting-item">
          <button onClick={handleExportData} className="export-btn">
            Export My Data
          </button>
        </div>
        <div className="setting-item">
          <button onClick={handleDeleteAccount} className="delete-btn">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserSettings
