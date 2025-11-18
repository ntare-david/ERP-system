import { Globe, Building2, SettingsIcon } from 'lucide-react'

export default function Settings() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Settings</h1>

      <div className="space-y-4">
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <Building2 size={24} className="text-blue-600" />
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Multi-Company</h2>
          </div>
          <select className="input-field">
            <option>No companies available</option>
          </select>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Add companies to see them here</p>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <Globe size={24} className="text-green-600" />
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Language</h2>
          </div>
          <select className="input-field">
            <option>English</option>
          </select>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <SettingsIcon size={24} className="text-purple-600" />
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Preferences</h2>
          </div>
          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-slate-700 dark:text-slate-300">Enable notifications</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-slate-700 dark:text-slate-300">Email digest</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
