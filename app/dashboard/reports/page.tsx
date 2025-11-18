'use client'

import { Button } from '@/components/ui/button'
import { Plus, Download, Share2 } from 'lucide-react'
import { ModuleHeader } from '@/components/modules/module-header'
import { Card, CardContent } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const reportData = [
  { name: 'Jan', value: 40 },
  { name: 'Feb', value: 35 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 45 },
]

const reports = [
  { id: 1, name: 'Sales Report Q1', type: 'Sales', created: '2024-01-15', status: 'Ready' },
  { id: 2, name: 'Inventory Audit', type: 'Inventory', created: '2024-01-10', status: 'Processing' },
  { id: 3, name: 'Revenue Analysis', type: 'Finance', created: '2024-01-05', status: 'Ready' },
]

export default function ReportsPage() {
  return (
    <div className="p-6 space-y-6">
      <ModuleHeader title="Reporting" description="Generate and manage business reports" />

      {/* Toolbar */}
      <div className="flex gap-3">
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          New Report
        </Button>
      </div>

      {/* Reports */}
      <div className="space-y-4">
        {reports.map((report) => (
          <Card key={report.id} className="bg-slate-900 border-slate-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-semibold text-white">{report.name}</p>
                  <p className="text-sm text-slate-400 mt-1">{report.type} • Created {report.created}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded text-xs font-semibold ${
                    report.status === 'Ready' ? 'bg-green-900 text-green-200' : 'bg-blue-900 text-blue-200'
                  }`}>
                    {report.status}
                  </span>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-slate-800 rounded text-slate-400 hover:text-white">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-slate-800 rounded text-slate-400 hover:text-white">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sample Chart */}
      <Card className="bg-slate-900 border-slate-800">
        <CardContent className="pt-6">
          <h3 className="text-white font-semibold mb-4">Sample Report Data</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={reportData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#e2e8f0' }} />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
