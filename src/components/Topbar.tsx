import { Bell, Search, Globe, Moon, Sun, LogOut } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useAuth } from '../contexts/AuthContext'
import { useState } from 'react'

export function Topbar() {
  const { isDark, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const [showProfile, setShowProfile] = useState(false)

  return (
    <div className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-6">
      <div className="flex items-center gap-4 flex-1">
        <div className="hidden sm:flex items-center gap-2 bg-slate-100 dark:bg-slate-700 px-3 py-2 rounded-lg flex-1 max-w-xs">
          <Search size={18} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm w-full text-slate-900 dark:text-white placeholder-slate-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
          <Bell size={20} className="text-slate-600 dark:text-slate-400" />
        </button>

        <button onClick={toggleTheme} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
          {isDark ? (
            <Sun size={20} className="text-slate-400" />
          ) : (
            <Moon size={20} className="text-slate-600" />
          )}
        </button>

        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
          <Globe size={20} className="text-slate-600 dark:text-slate-400" />
        </button>

        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <span className="text-sm font-medium text-slate-900 dark:text-white">{user?.name}</span>
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => {
                  logout()
                  setShowProfile(false)
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 text-left transition-colors rounded-lg"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
