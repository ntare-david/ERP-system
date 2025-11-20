import { useState, useRef } from 'react'
import { User, Phone, Mail, Edit2, Camera, X } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useSettings } from '../../contexts/SettingsContext'
import { useToast } from '../../contexts/ToastContext'

export function AccountSettings() {
  const { user, updateUser } = useAuth()
  const { settings, updateSettings } = useSettings()
  const { showToast } = useToast()
  const [showEditModal, setShowEditModal] = useState(false)
  const [formData, setFormData] = useState({
    username: settings.username || user?.username || '',
    displayName: settings.displayName || user?.name || '',
    phoneNumber: settings.phoneNumber || '',
    email: user?.email || '',
  })
  const fileInputRef = useRef(null)
  const [profilePicturePreview, setProfilePicturePreview] = useState(
    user?.profilePicture || null
  )

  const handleProfilePictureChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        showToast('Please select an image file', 'error')
        return
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showToast('Image size must be less than 5MB', 'error')
        return
      }

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result
        setProfilePicturePreview(result)
        // In production, upload to server and get URL
        // For now, store as data URL in localStorage
        updateUser({ profilePicture: result })
        showToast('Profile picture updated', 'success')
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveProfilePicture = () => {
    setProfilePicturePreview(null)
    updateUser({ profilePicture: undefined })
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    showToast('Profile picture removed', 'success')
  }

  const handleSaveProfile = () => {
    if (!formData.username.trim()) {
      showToast('Username is required', 'error')
      return
    }
    
    updateSettings({
      username: formData.username,
      displayName: formData.displayName,
      phoneNumber: formData.phoneNumber,
    })
    
    // Update user in AuthContext
    updateUser({
      username: formData.username,
      name: formData.displayName || formData.username,
    })
    
    showToast('Profile updated successfully', 'success')
    setShowEditModal(false)
  }

  return (
    <div className="space-y-6">
      {/* Profile Information */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <User size={24} className="text-blue-600" />
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Profile Information</h2>
          </div>
          <button
            onClick={() => {
              setFormData({
                username: settings.username || user?.username || '',
                displayName: settings.displayName || user?.name || '',
                phoneNumber: settings.phoneNumber || '',
                email: user?.email || '',
              })
              setShowEditModal(true)
            }}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
          >
            <Edit2 size={16} />
            Edit Profile
          </button>
        </div>

        {/* Profile Picture */}
        <div className="flex items-center gap-6 mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
          <div className="relative">
            {profilePicturePreview ? (
              <img
                src={profilePicturePreview}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-slate-200 dark:border-slate-700"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold border-4 border-slate-200 dark:border-slate-700">
                {(user?.name?.[0] || user?.username?.[0] || 'U').toUpperCase()}
              </div>
            )}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg"
            >
              <Camera size={16} />
            </button>
            {profilePicturePreview && (
              <button
                onClick={handleRemoveProfilePicture}
                className="absolute top-0 right-0 p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow-lg"
              >
                <X size={14} />
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              className="hidden"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
              {settings.displayName || user?.name || 'User'}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
              {user?.email || 'No email'}
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Change profile picture
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
            <User size={18} className="text-slate-400" />
            <div className="flex-1">
              <p className="text-xs text-slate-500 dark:text-slate-400">Username</p>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                {settings.username || user?.username || 'Not set'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
            <User size={18} className="text-slate-400" />
            <div className="flex-1">
              <p className="text-xs text-slate-500 dark:text-slate-400">Display Name</p>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                {settings.displayName || user?.name || 'Not set'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
            <Mail size={18} className="text-slate-400" />
            <div className="flex-1">
              <p className="text-xs text-slate-500 dark:text-slate-400">Email</p>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                {user?.email || 'Not set'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
            <Phone size={18} className="text-slate-400" />
            <div className="flex-1">
              <p className="text-xs text-slate-500 dark:text-slate-400">Phone Number</p>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                {settings.phoneNumber || 'Not set'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-md w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Edit Profile</h3>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Username *
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="input-field"
                placeholder="Enter username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Display Name
              </label>
              <input
                type="text"
                value={formData.displayName}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                className="input-field"
                placeholder="Enter display name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="input-field"
                placeholder="Enter phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                className="input-field"
                disabled
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Email cannot be changed</p>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button onClick={handleSaveProfile} className="flex-1 btn-primary">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

