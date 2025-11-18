import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard')
  }, [isAuthenticated, navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-2xl">
        <div className="space-y-2">
          <h1 className="text-5xl md:text-6xl font-bold text-white">ORM Management System</h1>
          <p className="text-xl text-slate-400">Enterprise Business Management Platform</p>
        </div>

        <p className="text-lg text-slate-300">
          Unified platform for managing accounting, sales, inventory, CRM, and HR operations with AI-powered insights.
        </p>

        <div className="flex gap-4 justify-center pt-4">
          <Link to="/login" className="btn-primary">
            Login
          </Link>
          <Link to="/signup" className="btn-secondary">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  )
}
