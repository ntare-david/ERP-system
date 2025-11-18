'use client'

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'

interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'manager' | 'user'
  company: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  updateUser: (user: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = useCallback(async (email: string, password: string) => {
    // Mock API call - replace with actual API
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      role: 'admin',
      company: 'Acme Corp',
    }
    setUser(mockUser)
    localStorage.setItem('token', 'mock-jwt-token')
  }, [])

  const signup = useCallback(async (email: string, password: string, name: string) => {
    const mockUser: User = {
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

  const updateUser = useCallback((updates: Partial<User>) => {
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
