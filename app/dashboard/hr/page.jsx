'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react'
import { ModuleHeader } from '@/components/modules/module-header'
import { Card, CardContent } from '@/components/ui/card'

const employees = [
  { id: 1, name: 'John Doe', position: 'Manager', department: 'Sales', email: 'john@company.com', status: 'Active' },
  { id: 2, name: 'Jane Smith', position: 'Developer', department: 'IT', email: 'jane@company.com', status: 'Active' },
  { id: 3, name: 'Mike Johnson', position: 'Accountant', department: 'Finance', email: 'mike@company.com', status: 'On Leave' },
]

export default function HRPage() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="p-6 space-y-6">
      <ModuleHeader title="HR" description="Manage employees, attendance, and leaves" />

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-800">
        {['Employees', 'Attendance', 'Leaves'].map((tab) => (
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
            placeholder="Search employees..."
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
          New Employee
        </Button>
      </div>

      {/* Table */}
      <Card className="bg-slate-900 border-slate-800">
        <CardContent className="pt-6">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase">Name</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase">Position</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase">Department</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase">Email</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase">Status</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-slate-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id} className="border-b border-slate-800 hover:bg-slate-800 transition">
                  <td className="py-3 px-4 text-slate-200">{emp.name}</td>
                  <td className="py-3 px-4 text-slate-200">{emp.position}</td>
                  <td className="py-3 px-4 text-slate-200">{emp.department}</td>
                  <td className="py-3 px-4 text-slate-200">{emp.email}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      emp.status === 'Active' ? 'bg-green-900 text-green-200' : 'bg-yellow-900 text-yellow-200'
                    }`}>
                      {emp.status}
                    </span>
                  </td>
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

