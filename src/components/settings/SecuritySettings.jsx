import { Shield, Key, Lock, LogOut, Clock, Smartphone, Eye, EyeOff, KeyRound, Trash2, Copy, Check } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useSettings } from '../../contexts/SettingsContext'
import { useToast } from '../../contexts/ToastContext'
import { useState } from 'react'

export function SecuritySettings() {
  const { logout, user } = useAuth()
  const { settings, updateSettings } = useSettings()
  const { showToast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [passwordError, setPasswordError] = useState('')
  const [apiKeys, setApiKeys] = useState([])
  const [copiedKeyId, setCopiedKeyId] = useState(null)
  const [sessions, setSessions] = useState([])

  const handleLogoutAll = () => {
    if (window.confirm('Are you sure you want to logout from all devices? This will invalidate all active sessions.')) {
      logout()
      showToast('Logged out from all devices', 'success')
    }
  }

  const handleClearCache = () => {
    if (window.confirm('Are you sure you want to clear all app cache and local data? This cannot be undone.')) {
      localStorage.clear()
      sessionStorage.clear()
      showToast('Cache cleared successfully', 'success')
      window.location.reload()
    }
  }

  const handleChangePassword = () => {
    setPasswordError('')
    
    if (!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordError('All fields are required')
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match')
      return
    }

    if (passwordData.newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters')
      return
    }

    // Check password strength
    const hasUpperCase = /[A-Z]/.test(passwordData.newPassword)
    const hasLowerCase = /[a-z]/.test(passwordData.newPassword)
    const hasNumbers = /\d/.test(passwordData.newPassword)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(passwordData.newPassword)

    if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
      setPasswordError('Password must contain uppercase, lowercase, number, and special character')
      return
    }

    // In production, this would call the API
    showToast('Password changed successfully', 'success')
    setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' })
  }

  const handleCopyApiKey = (keyId, key) => {
    navigator.clipboard.writeText(key)
    setCopiedKeyId(keyId)
    showToast('API key copied to clipboard', 'success')
    setTimeout(() => setCopiedKeyId(null), 2000)
  }

  const handleDeleteApiKey = (keyId) => {
    if (window.confirm('Are you sure you want to delete this API key? This action cannot be undone.')) {
      setApiKeys(apiKeys.filter(k => k.id !== keyId))
      showToast('API key deleted', 'success')
    }
  }

  const handleRevokeSession = (sessionId) => {
    if (window.confirm('Are you sure you want to revoke this session?')) {
      setSessions(sessions.filter(s => s.id !== sessionId))
      showToast('Session revoked', 'success')
    }
  }

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' }
    
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++

    if (strength <= 2) return { strength, label: 'Weak', color: 'bg-red-500' }
    if (strength <= 3) return { strength, label: 'Fair', color: 'bg-yellow-500' }
    if (strength <= 4) return { strength, label: 'Good', color: 'bg-blue-500' }
    return { strength, label: 'Strong', color: 'bg-green-500' }
  }

  const passwordStrength = getPasswordStrength(passwordData.newPassword)

  return (
    <div className="space-y-6">
      {/* Password Management */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <Key size={24} className="text-blue-600" />
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Password Management</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={passwordData.oldPassword}
                onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                className="input-field pr-10"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              New Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              className="input-field"
              placeholder="Enter new password (min 8 characters)"
            />
            {passwordData.newPassword && (
              <div className="mt-2">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${passwordStrength.color}`}
                      style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                    />
                  </div>
                  <span className={`text-xs font-medium ${
                    passwordStrength.label === 'Weak' ? 'text-red-600' :
                    passwordStrength.label === 'Fair' ? 'text-yellow-600' :
                    passwordStrength.label === 'Good' ? 'text-blue-600' :
                    'text-green-600'
                  }`}>
                    {passwordStrength.label}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Use 8+ characters with a mix of letters, numbers & symbols
                </p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Confirm New Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              className="input-field"
              placeholder="Confirm new password"
            />
          </div>

          {passwordError && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
              {passwordError}
            </div>
          )}

          <button onClick={handleChangePassword} className="w-full btn-primary">
            Change Password
          </button>
        </div>
      </div>

      {/* API Keys Management */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <KeyRound size={24} className="text-purple-600" />
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">API Keys</h2>
          </div>
          <button className="btn-primary text-sm">
            Generate New Key
          </button>
        </div>
        {apiKeys.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-full mb-3">
              <KeyRound size={24} className="text-slate-400" />
            </div>
            <p className="text-sm font-medium text-slate-900 dark:text-white mb-1">No API keys</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
              Generate an API key to get started with API access.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {apiKeys.map((apiKey) => (
              <div
                key={apiKey.id}
                className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg"
              >
                <div className="flex-1">
                  <p className="font-medium text-slate-900 dark:text-white">{apiKey.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-mono">{apiKey.key}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                    Created {apiKey.created} • Last used {apiKey.lastUsed}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyApiKey(apiKey.id, apiKey.key)}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    title="Copy key"
                  >
                    {copiedKeyId === apiKey.id ? (
                      <Check size={18} className="text-green-600" />
                    ) : (
                      <Copy size={18} className="text-slate-600 dark:text-slate-400" />
                    )}
                  </button>
                  <button
                    onClick={() => handleDeleteApiKey(apiKey.id)}
                    className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title="Delete key"
                  >
                    <Trash2 size={18} className="text-red-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Active Sessions */}
      <div className="card">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Active Sessions</h2>
        {sessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-full mb-3">
              <Clock size={24} className="text-slate-400" />
            </div>
            <p className="text-sm font-medium text-slate-900 dark:text-white mb-1">No active sessions</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
              Your active login sessions will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="flex items-start justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg"
              >
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
                    <Clock size={16} className="text-slate-600 dark:text-slate-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{session.device}</p>
                      {session.current && (
                        <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {session.location} • IP: {session.ip}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                      Last active: {session.lastActive}
                    </p>
                  </div>
                </div>
                {!session.current && (
                  <button
                    onClick={() => handleRevokeSession(session.id)}
                    className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    Revoke
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Security Options */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <Shield size={24} className="text-red-600" />
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Security Settings</h2>
        </div>

        <div className="space-y-3">
          {/* Auto-lock */}
          <label className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors">
            <div className="flex items-center gap-3">
              <Lock size={20} className="text-slate-400" />
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Auto-lock After Inactivity</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Automatically lock the app after period of inactivity</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.autoLock}
              onChange={(e) => updateSettings({ autoLock: e.target.checked })}
              className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500"
            />
          </label>

          {/* Two-Factor Authentication */}
          <label className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors">
            <div className="flex items-center gap-3">
              <Smartphone size={20} className="text-slate-400" />
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Two-Factor Authentication</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {settings.twoFactorEnabled ? 'Enabled' : 'Add an extra layer of security'}
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.twoFactorEnabled}
              onChange={(e) => updateSettings({ twoFactorEnabled: e.target.checked })}
              className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500"
            />
          </label>
        </div>
      </div>

      {/* Security Actions */}
      <div className="card">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Security Actions</h2>
        <div className="space-y-3">
          <button
            onClick={handleLogoutAll}
            className="w-full flex items-center justify-between p-4 border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <LogOut size={20} className="text-red-600 dark:text-red-400" />
              <span className="text-red-700 dark:text-red-300 font-medium">Logout from All Devices</span>
            </div>
            <span className="text-red-400">→</span>
          </button>

          <button
            onClick={handleClearCache}
            className="w-full flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Key size={20} className="text-slate-600 dark:text-slate-400" />
              <span className="text-slate-900 dark:text-white font-medium">Clear App Cache & Local Data</span>
            </div>
            <span className="text-slate-400">→</span>
          </button>
        </div>
      </div>
    </div>
  )
}

