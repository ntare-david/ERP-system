'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react'
import { ModuleHeader } from '@/components/modules/module-header'
import { Card, CardContent } from '@/components/ui/card'

const leads = [
  { id: 1, name: 'John Smith', company: 'Tech Corp', status: 'Qualified', value: '$50,000', email: 'john@techcorp.com' },
  { id: 2, name: 'Sarah Johnson', company: 'Business Inc', status: 'Proposal Sent', value: '$75,000', email: 'sarah@business.com' },
  { id: 3, name: 'Mike Davis', company: 'Global Ltd', status: 'New', value: '$30,000', email: 'mike@global.com' },
]

export default function CRMPage() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="p-6 space-y-6">
      <ModuleHeader title="CRM" description="Manage leads, pipeline, and opportunities" />

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-800">
        {['Leads', 'Pipeline', 'Opportunities'].map((tab) => (
          <button
            key={tab}
            className="px-4 py-2 border-b-2 border-transparent text-slate-400 hover:text-white hover:border-blue-600 transition"
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex gap-3 items-center">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
          <Input
            type="text"
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-800 border-slate-700 text-white"
          />
        </div>
        <Button variant="outline" className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          New Lead
        </Button>
      </div>

      {/* Table */}
      <Card className="bg-slate-900 border-slate-800">
        <CardContent className="pt-6">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase">Name</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase">Company</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase">Email</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase">Status</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase">Value</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-slate-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-slate-800 hover:bg-slate-800 transition">
                  <td className="py-3 px-4 text-slate-200">{lead.name}</td>
                  <td className="py-3 px-4 text-slate-200">{lead.company}</td>
                  <td className="py-3 px-4 text-slate-200">{lead.email}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-900 text-blue-200">
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-200 font-semibold">{lead.value}</td>
                  <td className="py-3 px-4 text-right flex gap-2 justify-end">
                    <button className="p-2 hover:bg-slate-700 rounded text-slate-400 hover:text-white">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-slate-700 rounded text-slate-400 hover:text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}

