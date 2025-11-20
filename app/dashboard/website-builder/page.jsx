'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, Grid3x3, Palette, Settings } from 'lucide-react'
import { ModuleHeader } from '@/components/modules/module-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const templates = [
  { id: 1, name: 'Business Landing', preview: '🏢', category: 'Landing' },
  { id: 2, name: 'E-commerce Store', preview: '🛒', category: 'Store' },
  { id: 3, name: 'Portfolio', preview: '🎨', category: 'Portfolio' },
  { id: 4, name: 'Blog', preview: '📝', category: 'Blog' },
]

const recentPages = [
  { id: 1, name: 'Homepage', status: 'Published', updated: '2 hours ago' },
  { id: 2, name: 'About Us', status: 'Draft', updated: '1 day ago' },
  { id: 3, name: 'Services', status: 'Published', updated: '3 days ago' },
]

export default function WebsiteBuilderPage() {
  const [view, setView] = useState('recent')

  return (
    <div className="p-6 space-y-6">
      <ModuleHeader title="Website Builder" description="Create and manage website pages with drag-and-drop" />

      {/* Toolbar */}
      <div className="flex gap-3 items-center">
        <div className="flex gap-2 bg-slate-800 rounded-lg p-1">
          <button
            onClick={() => setView('recent')}
            className={`px-3 py-2 rounded ${view === 'recent' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
          >
            Recent Pages
          </button>
          <button
            onClick={() => setView('templates')}
            className={`px-3 py-2 rounded ${view === 'templates' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
          >
            Templates
          </button>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 ml-auto">
          <Plus className="w-4 h-4 mr-2" />
          New Page
        </Button>
      </div>

      {/* Recent Pages */}
      {view === 'recent' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentPages.map((page) => (
            <Card key={page.id} className="bg-slate-900 border-slate-800 hover:border-blue-600 cursor-pointer transition">
              <CardContent className="pt-6">
                <div className="flex flex-col justify-between h-32">
                  <div>
                    <p className="font-semibold text-white">{page.name}</p>
                    <p className="text-xs text-slate-400 mt-1">{page.updated}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded w-fit ${
                    page.status === 'Published' ? 'bg-green-900 text-green-200' : 'bg-yellow-900 text-yellow-200'
                  }`}>
                    {page.status}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Templates */}
      {view === 'templates' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {templates.map((template) => (
            <Card key={template.id} className="bg-slate-900 border-slate-800 hover:border-blue-600 cursor-pointer transition">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center h-40 space-y-3">
                  <div className="text-5xl">{template.preview}</div>
                  <div className="text-center">
                    <p className="font-semibold text-white text-sm">{template.name}</p>
                    <p className="text-xs text-slate-400">{template.category}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

