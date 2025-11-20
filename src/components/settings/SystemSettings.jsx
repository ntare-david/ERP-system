import { Globe, Server, Download, Database, Building2, Users, FileText, Activity, Zap } from 'lucide-react'
import { useSettings } from '../../contexts/SettingsContext'
import { useToast } from '../../contexts/ToastContext'
import { useAuth } from '../../contexts/AuthContext'
import { useState } from 'react'

export function SystemSettings() {
  const { settings, updateSettings, exportSettings } = useSettings()
  const { showToast } = useToast()
  const { user } = useAuth()
  const [activityLogs] = useState([])

  const handleExport = () => {
    const dataStr = exportSettings()
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `user-settings-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    showToast('Settings exported successfully', 'success')
  }

  return (
    <div className="space-y-6">
      {/* Company Settings */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <Building2 size={24} className="text-indigo-600" />
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Company Settings</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Active Company
            </label>
            <select className="input-field">
              <option>{user?.company || 'No companies available'}</option>
            </select>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Switch between companies you have access to
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Company Name
            </label>
            <input
              type="text"
              value={user?.company || ''}
              readOnly
              className="input-field bg-slate-50 dark:bg-slate-800 cursor-not-allowed"
              placeholder="Enter company name"
            />
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Company name is managed by your administrator
            </p>
          </div>
        </div>
      </div>

      {/* API Endpoint */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <Server size={24} className="text-green-600" />
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">API Configuration</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              API Endpoint
            </label>
            <select
              value={settings.apiEndpoint}
              onChange={(e) => {
                const endpoint = e.target.value
                let baseUrl = settings.apiBaseUrl
                if (endpoint === 'production') {
                  baseUrl = 'https://api.example.com/api'
                } else if (endpoint === 'local') {
                  baseUrl = 'http://localhost:8000/api'
                } else if (endpoint === 'development') {
                  baseUrl = 'https://dev-api.example.com/api'
                }
                updateSettings({ apiEndpoint: endpoint, apiBaseUrl: baseUrl })
              }}
              className="input-field"
            >
              <option value="development">Development</option>
              <option value="local">Local (localhost)</option>
              <option value="production">Production</option>
            </select>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Current: {settings.apiEndpoint === 'production' ? 'Production API' : settings.apiEndpoint === 'local' ? 'Local API' : 'Development API'}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              API Base URL
            </label>
            <input
              type="text"
              value={settings.apiBaseUrl || ''}
              onChange={(e) => updateSettings({ apiBaseUrl: e.target.value })}
              className="input-field"
              placeholder="API base URL"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Default: {settings.apiEndpoint === 'production' 
                ? 'https://api.example.com/api'
                : settings.apiEndpoint === 'local'
                ? 'http://localhost:8000/api'
                : 'https://dev-api.example.com/api'}
            </p>
          </div>
        </div>
      </div>

      {/* Language & Region */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <Globe size={24} className="text-blue-600" />
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Language & Region</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Language
            </label>
            <select
              value={settings.language}
              onChange={(e) => updateSettings({ language: e.target.value })}
              className="input-field"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="zh">Chinese</option>
              <option value="ja">Japanese</option>
              <option value="ko">Korean</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Timezone
            </label>
            <select
              value={settings.timezone}
              onChange={(e) => updateSettings({ timezone: e.target.value })}
              className="input-field"
            >
              <option value="UTC">UTC (Coordinated Universal Time)</option>
              <option value="America/New_York">America/New_York (EST)</option>
              <option value="America/Los_Angeles">America/Los_Angeles (PST)</option>
              <option value="America/Chicago">America/Chicago (CST)</option>
              <option value="Europe/London">Europe/London (GMT)</option>
              <option value="Europe/Paris">Europe/Paris (CET)</option>
              <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
              <option value="Asia/Shanghai">Asia/Shanghai (CST)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Date Format
            </label>
            <select
              value={settings.dateFormat}
              onChange={(e) => updateSettings({ dateFormat: e.target.value })}
              className="input-field"
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY (US)</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY (EU)</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD (ISO)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Time Format
            </label>
            <select
              value={settings.timeFormat}
              onChange={(e) => updateSettings({ timeFormat: e.target.value })}
              className="input-field"
            >
              <option value="12h">12-hour (AM/PM)</option>
              <option value="24h">24-hour</option>
            </select>
          </div>
        </div>
      </div>

      {/* Activity Log */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <Activity size={24} className="text-orange-600" />
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Activity Log</h2>
        </div>
        {activityLogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-full mb-3">
              <Activity size={24} className="text-slate-400" />
            </div>
            <p className="text-sm font-medium text-slate-900 dark:text-white mb-1">No activity</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
              Your recent activities will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {activityLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-start gap-3 p-3 border border-slate-200 dark:border-slate-700 rounded-lg"
              >
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Zap size={16} className="text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{log.action}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {log.module} • {log.user} • {log.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Data Management */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <Database size={24} className="text-purple-600" />
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Data Management</h2>
        </div>
        <div className="space-y-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
              Export your user settings and preferences as a JSON file. This can be used to backup your settings or import them on another device.
            </p>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download size={18} />
              Export Settings
            </button>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
              Import settings from a previously exported JSON file.
            </p>
            <label className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer transition-colors">
              <FileText size={18} />
              <span className="text-sm">Import Settings</span>
              <input type="file" accept=".json" className="hidden" />
            </label>
          </div>
        </div>
      </div>

      {/* User Preferences */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <Users size={24} className="text-pink-600" />
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">User Preferences</h2>
        </div>
        <div className="space-y-3">
          <label className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors">
            <div>
              <p className="font-medium text-slate-900 dark:text-white">Show Welcome Message</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Display welcome message on login</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-blue-600" />
          </label>
          <label className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors">
            <div>
              <p className="font-medium text-slate-900 dark:text-white">Enable Keyboard Shortcuts</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Use keyboard shortcuts for faster navigation</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-blue-600" />
          </label>
          <label className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors">
            <div>
              <p className="font-medium text-slate-900 dark:text-white">Show Tooltips</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Display helpful tooltips throughout the app</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-blue-600" />
          </label>
        </div>
      </div>
    </div>
  )
}

