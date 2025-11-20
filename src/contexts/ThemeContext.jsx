import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'

const ThemeContext = createContext(undefined)

export function ThemeProvider({ children }) {
  // Get system preference
  const getSystemPreference = useCallback(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }, [])

  // Initialize theme from localStorage or default to system
  const getInitialTheme = () => {
    if (typeof window === 'undefined') return 'system'
    const saved = localStorage.getItem('theme')
    if (saved && ['light', 'dark', 'system'].includes(saved)) {
      return saved
    }
    return 'system'
  }

  // Calculate isDark based on theme
  const calculateIsDark = useCallback((currentTheme) => {
    if (currentTheme === 'system') {
      return getSystemPreference()
    }
    return currentTheme === 'dark'
  }, [getSystemPreference])

  const [theme, setThemeState] = useState(() => getInitialTheme())
  const [isDark, setIsDark] = useState(() => {
    const initialTheme = getInitialTheme()
    return calculateIsDark(initialTheme)
  })

  // Apply theme immediately on mount to prevent flash
  useEffect(() => {
    const html = document.documentElement
    const initialTheme = getInitialTheme()
    const initialIsDark = calculateIsDark(initialTheme)
    
    if (initialIsDark) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  }, [calculateIsDark])

  // Update isDark when theme changes
  useEffect(() => {
    const newIsDark = calculateIsDark(theme)
    setIsDark(newIsDark)
  }, [theme, calculateIsDark])

  // Apply dark class to document when isDark changes
  useEffect(() => {
    const html = document.documentElement
    if (isDark) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  }, [isDark])

  // Listen for system preference changes when theme is 'system'
  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = (e) => {
        setIsDark(e.matches)
      }
      
      // Set initial value
      setIsDark(mediaQuery.matches)
      
      // Listen for changes
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [theme])

  // Save theme preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme)
    }
  }, [theme])

  const setTheme = useCallback((newTheme) => {
    setThemeState(newTheme)
  }, [])

  const toggleTheme = useCallback(() => {
    if (theme === 'system') {
      // If system, toggle to opposite of current system preference
      const systemIsDark = getSystemPreference()
      setThemeState(systemIsDark ? 'light' : 'dark')
    } else {
      // Toggle between light and dark
      setThemeState(theme === 'dark' ? 'light' : 'dark')
    }
  }, [theme, getSystemPreference])

  return (
    <ThemeContext.Provider value={{ theme, isDark, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}

