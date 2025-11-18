'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ModuleHeader } from '@/components/modules/module-header'
import { Save } from 'lucide-react'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    companyName: 'Your Company',
    email: 'admin@company.com',
    timezone: 'UTC',
    language: 'English',
    currency: 'USD',
  })

  return (
    <div className="p-6 space-y-6">
      <ModuleHeader title="Settings" description="Manage system and company settings" />

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-800">
        {['General', 'Users', 'Security', 'Integrations'].map((tab) => (
          <button
            key={tab}
            className="px-4 py-2 border-b-2 border-transparent text-slate-400 hover:text-white hover:border-blue-600 transition"
          >
            {tab}
          </button>
        ))}
      </div>

      {/* General Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Company Information</CardTitle>
            <CardDescription className="text-slate-400">Update your company details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-slate-200">Company Name</Label>
              <Input
                value={settings.companyName}
                onChange={(e) => setSettings({...settings, companyName: e.target.value})}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-200">Email</Label>
              <Input
                value={settings.email}
                onChange={(e) => setSettings({...settings, email: e.target.value})}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Preferences</CardTitle>
            <CardDescription className="text-slate-400">Customize your experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-slate-200">Timezone</Label>
              <Input value={settings.timezone} className="bg-slate-800 border-slate-700 text-white" />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-200">Language</Label>
              <Input value={settings.language} className="bg-slate-800 border-slate-700 text-white" />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
