'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = useCallback(async (email, password) => {
    // Mock API call - replace with actual API
    const mockUser = {
      id: '1',
      email,
      name: email.split('@')[0],
      role: 'admin',
      company: 'Acme Corp',
    }
    setUser(mockUser)
    localStorage.setItem('token', 'mock-jwt-token')
  }, [])

  const signup = useCallback(async (email, password, name) => {
    const mockUser = {
      id: '2',
      email,
      name,
      role: 'user',
      company: 'New Company',
    }
    setUser(mockUser)
    localStorage.setItem('token', 'mock-jwt-token')
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('token')
  }, [])

  const updateUser = useCallback((updates) => {
    setUser(prev => prev ? { ...prev, ...updates } : null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

