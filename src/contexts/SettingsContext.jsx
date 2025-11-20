import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const defaultSettings = {
  username: '',
  displayName: '',
  phoneNumber: '',
  emailNotifications: true,
  pushNotifications: true,
  inAppAlerts: true,
  notificationSound: false,
  autoLock: false,
  twoFactorEnabled: false,
  apiEndpoint: 'local',
  apiBaseUrl: 'http://localhost:8000/api',
  language: 'en',
  timezone: 'UTC',
  dateFormat: 'MM/DD/YYYY',
  timeFormat: '12h',
  uiDensity: 'comfortable',
}

const SettingsContext = createContext(undefined)

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings)

  // Load settings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('user_settings')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setSettings({ ...defaultSettings, ...parsed })
      } catch (error) {
        console.error('Failed to parse settings:', error)
      }
    }
  }, [])

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('user_settings', JSON.stringify(settings))
  }, [settings])

  const updateSettings = useCallback((updates) => {
    setSettings((prev) => ({ ...prev, ...updates }))
  }, [])

  const resetSettings = useCallback(() => {
    setSettings(defaultSettings)
    localStorage.removeItem('user_settings')
  }, [])

  const exportSettings = useCallback(() => {
    return JSON.stringify(settings, null, 2)
  }, [settings])

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, resetSettings, exportSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (!context) throw new Error('useSettings must be used within SettingsProvider')
  return context
}

