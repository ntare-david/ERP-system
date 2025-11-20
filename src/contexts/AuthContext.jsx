import React, { createContext, useContext, useState, useEffect } from 'react'
import { authApi } from '../api/auth'
import { apiClient } from '../api/client'

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      const userData = localStorage.getItem('user_data')
      if (userData) {
        try {
          setUser(JSON.parse(userData))
        } catch (error) {
          console.error('Failed to parse user data:', error)
        }
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email, password) => {
    setIsLoading(true)
    try {
      const response = await authApi.login({ email, password })
      const userData = {
        id: response.data.user.id,
        email: response.data.user.email,
        name: response.data.user.name,
        username: response.data.user.name.toLowerCase().replace(/\s+/g, '_'),
        role: response.data.user.role,
        company: response.data.user.company || '',
        profilePicture: undefined,
      }
      apiClient.setToken(response.data.token)
      localStorage.setItem('user_data', JSON.stringify(userData))
      setUser(userData)
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithGoogle = async () => {
    setIsLoading(true)
    try {
      // Google OAuth flow
      // In production, this would use Google OAuth 2.0
      // For now, we'll simulate it with a popup/redirect flow
      
      // Create a mock Google user for demonstration
      // In real implementation, you'd use Google OAuth library
      const mockGoogleUser = {
        id: 'google_' + Date.now(),
        email: 'user@gmail.com',
        name: 'Google User',
        username: 'google_user',
        role: 'user',
        company: 'My Company',
        profilePicture: 'https://ui-avatars.com/api/?name=Google+User&background=3b82f6&color=fff&size=128',
      }
      
      // In production, you'd exchange the Google token with your backend
      const mockToken = 'google_token_' + Date.now()
      apiClient.setToken(mockToken)
      localStorage.setItem('user_data', JSON.stringify(mockGoogleUser))
      localStorage.setItem('auth_provider', 'google')
      setUser(mockGoogleUser)
    } catch (error) {
      console.error('Google login failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (email, password, name, username) => {
    setIsLoading(true)
    try {
      const response = await authApi.signup({ email, password, name })
      const userData = {
        id: response.data.user.id,
        email: response.data.user.email,
        name: response.data.user.name,
        username: username || response.data.user.name.toLowerCase().replace(/\s+/g, '_'),
        role: response.data.user.role,
        company: response.data.user.company || '',
        profilePicture: undefined,
      }
      apiClient.setToken(response.data.token)
      localStorage.setItem('user_data', JSON.stringify(userData))
      setUser(userData)
    } catch (error) {
      console.error('Signup failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const updateUser = (updates) => {
    if (user) {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem('user_data', JSON.stringify(updatedUser))
    }
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_data')
    localStorage.removeItem('auth_provider')
    setUser(null)
    window.location.href = '/login'
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, loginWithGoogle, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

