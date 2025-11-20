import { Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { useSettings } from '../../contexts/SettingsContext'

export function ThemeSettings() {
  const { theme, isDark, setTheme, toggleTheme } = useTheme()
  const { settings, updateSettings } = useSettings()

  return (
    <div className="space-y-6">
      {/* Theme Mode Selection */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          {isDark ? (
            <Moon size={24} className="text-purple-600" />
          ) : (
            <Sun size={24} className="text-yellow-600" />
          )}
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Theme & Appearance</h2>
        </div>

        <div className="space-y-4">
          {/* Theme Mode Options */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              Theme Mode
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setTheme('light')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  theme === 'light'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 shadow-sm'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <Sun size={24} className={`mx-auto mb-2 ${theme === 'light' ? 'text-blue-600' : 'text-slate-400'}`} />
                <p className={`text-sm font-medium ${theme === 'light' ? 'text-blue-600' : 'text-slate-500 dark:text-slate-400'}`}>
                  Light
                </p>
              </button>

              <button
                onClick={() => setTheme('dark')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  theme === 'dark'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 shadow-sm'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <Moon size={24} className={`mx-auto mb-2 ${theme === 'dark' ? 'text-blue-600' : 'text-slate-400'}`} />
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-blue-600' : 'text-slate-500 dark:text-slate-400'}`}>
                  Dark
                </p>
              </button>

              <button
                onClick={() => setTheme('system')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  theme === 'system'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 shadow-sm'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <Monitor size={24} className={`mx-auto mb-2 ${theme === 'system' ? 'text-blue-600' : 'text-slate-400'}`} />
                <p className={`text-sm font-medium ${theme === 'system' ? 'text-blue-600' : 'text-slate-500 dark:text-slate-400'}`}>
                  System
                </p>
              </button>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              {theme === 'system' 
                ? 'Following your system preference' 
                : `Currently using ${theme} theme`}
            </p>
          </div>

          {/* Quick Toggle */}
          <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
            <div>
              <p className="font-medium text-slate-900 dark:text-white">Quick Toggle</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Switch between light and dark mode
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isDark ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isDark ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Preview Boxes */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              Preview
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white border-2 border-slate-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Sun size={16} className="text-yellow-500" />
                  <span className="text-sm font-medium text-slate-900">Light Mode</span>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-blue-500 rounded w-3/4"></div>
                  <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                  <div className="h-3 bg-slate-200 rounded w-2/3"></div>
                </div>
              </div>
              <div className="p-4 bg-slate-900 border-2 border-slate-700 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Moon size={16} className="text-purple-400" />
                  <span className="text-sm font-medium text-white">Dark Mode</span>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-blue-500 rounded w-3/4"></div>
                  <div className="h-3 bg-slate-700 rounded w-1/2"></div>
                  <div className="h-3 bg-slate-700 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* UI Density */}
      <div className="card">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">UI Density</h2>
        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer">
            <div>
              <p className="font-medium text-slate-900 dark:text-white">Comfortable</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">More spacing between elements</p>
            </div>
            <input
              type="radio"
              name="uiDensity"
              value="comfortable"
              checked={settings.uiDensity === 'comfortable'}
              onChange={() => updateSettings({ uiDensity: 'comfortable' })}
              className="w-4 h-4 text-blue-600"
            />
          </label>
          <label className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer">
            <div>
              <p className="font-medium text-slate-900 dark:text-white">Compact</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Tighter spacing for more content</p>
            </div>
            <input
              type="radio"
              name="uiDensity"
              value="compact"
              checked={settings.uiDensity === 'compact'}
              onChange={() => updateSettings({ uiDensity: 'compact' })}
              className="w-4 h-4 text-blue-600"
            />
          </label>
        </div>
      </div>
    </div>
  )
}

