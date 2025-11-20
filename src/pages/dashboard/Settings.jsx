import { useState } from 'react'
import { User, Palette, Bell, Shield, Settings as SettingsIcon, ChevronRight, Home } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AccountSettings } from '../../components/settings/AccountSettings'
import { ThemeSettings } from '../../components/settings/ThemeSettings'
import { NotificationSettings } from '../../components/settings/NotificationSettings'
import { SecuritySettings } from '../../components/settings/SecuritySettings'
import { SystemSettings } from '../../components/settings/SystemSettings'
import { useToast } from '../../contexts/ToastContext'

export default function Settings() {
  const [activeTab, setActiveTab] = useState('account')
  const { showToast } = useToast()

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'system', label: 'System', icon: SettingsIcon },
  ]

  const handleSave = () => {
    showToast('Settings saved successfully', 'success')
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
        <Link to="/dashboard" className="hover:text-slate-900 dark:hover:text-white transition-colors">
          <Home size={16} className="inline mr-1" />
          Dashboard
        </Link>
        <ChevronRight size={16} />
        <span className="text-slate-900 dark:text-white font-medium">Settings</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Settings</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Manage your account settings and preferences</p>
        </div>
        <button onClick={handleSave} className="btn-primary">
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="card p-2">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {activeTab === 'account' && <AccountSettings />}
          {activeTab === 'appearance' && <ThemeSettings />}
          {activeTab === 'notifications' && <NotificationSettings />}
          {activeTab === 'security' && <SecuritySettings />}
          {activeTab === 'system' && <SystemSettings />}
        </div>
      </div>
    </div>
  )
}

