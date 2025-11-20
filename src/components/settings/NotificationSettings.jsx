import { Bell, Mail, Smartphone, AlertCircle, Volume2, VolumeX } from 'lucide-react'
import { useSettings } from '../../contexts/SettingsContext'

export function NotificationSettings() {
  const { settings, updateSettings } = useSettings()

  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-4">
        <Bell size={24} className="text-orange-600" />
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Notification Preferences</h2>
      </div>

      <div className="space-y-3">
        {/* Email Notifications */}
        <label className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors">
          <div className="flex items-center gap-3">
            <Mail size={20} className="text-slate-400" />
            <div>
              <p className="font-medium text-slate-900 dark:text-white">Email Notifications</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Receive notifications via email</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={settings.emailNotifications}
            onChange={(e) => updateSettings({ emailNotifications: e.target.checked })}
            className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500"
          />
        </label>

        {/* Push Notifications */}
        <label className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors">
          <div className="flex items-center gap-3">
            <Smartphone size={20} className="text-slate-400" />
            <div>
              <p className="font-medium text-slate-900 dark:text-white">Push Notifications</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Receive system/browser push notifications</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={settings.pushNotifications}
            onChange={(e) => updateSettings({ pushNotifications: e.target.checked })}
            className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500"
          />
        </label>

        {/* In-App Alerts */}
        <label className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors">
          <div className="flex items-center gap-3">
            <AlertCircle size={20} className="text-slate-400" />
            <div>
              <p className="font-medium text-slate-900 dark:text-white">In-App Alerts</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Show toast notifications and banners</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={settings.inAppAlerts}
            onChange={(e) => updateSettings({ inAppAlerts: e.target.checked })}
            className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500"
          />
        </label>

        {/* Notification Sound */}
        <label className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors">
          <div className="flex items-center gap-3">
            {settings.notificationSound ? (
              <Volume2 size={20} className="text-slate-400" />
            ) : (
              <VolumeX size={20} className="text-slate-400" />
            )}
            <div>
              <p className="font-medium text-slate-900 dark:text-white">Notification Sound</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Play sound when notifications arrive</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={settings.notificationSound}
            onChange={(e) => updateSettings({ notificationSound: e.target.checked })}
            className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500"
          />
        </label>
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>Note:</strong> Notification preferences are saved automatically and will be applied to all future notifications.
        </p>
      </div>
    </div>
  )
}

