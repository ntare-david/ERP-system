'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react'
import { ModuleHeader } from '@/components/modules/module-header'
import { DataTable } from '@/components/modules/data-table'

const invoices = [
  { id: 'INV-001', client: 'Acme Corp', amount: '$5,000', date: '2024-01-15', status: 'Paid' },
  { id: 'INV-002', client: 'Tech Solutions', amount: '$3,500', date: '2024-01-10', status: 'Pending' },
  { id: 'INV-003', client: 'Global Industries', amount: '$8,200', date: '2024-01-05', status: 'Overdue' },
]

const columns = [
  { key: 'id', label: 'Invoice ID' },
  { key: 'client', label: 'Client' },
  { key: 'amount', label: 'Amount' },
  { key: 'date', label: 'Date' },
  { key: 'status', label: 'Status' },
]

export default function AccountingPage() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="p-6 space-y-6">
      <ModuleHeader title="Accounting" description="Manage invoices, payments, and ledger" />

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-800">
        {['Invoices', 'Payments', 'Ledger'].map((tab) => (
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
            placeholder="Search invoices..."
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
          New Invoice
        </Button>
      </div>

      {/* Table */}
      <Card className="bg-slate-900 border-slate-800">
        <CardContent className="pt-6">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                {columns.map((col) => (
                  <th key={col.key} className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase">
                    {col.label}
                  </th>
                ))}
                <th className="text-right py-3 px-4 text-xs font-semibold text-slate-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-slate-800 hover:bg-slate-800 transition">
                  <td className="py-3 px-4 text-slate-200">{invoice.id}</td>
                  <td className="py-3 px-4 text-slate-200">{invoice.client}</td>
                  <td className="py-3 px-4 text-slate-200">{invoice.amount}</td>
                  <td className="py-3 px-4 text-slate-200">{invoice.date}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      invoice.status === 'Paid' ? 'bg-green-900 text-green-200' :
                      invoice.status === 'Pending' ? 'bg-yellow-900 text-yellow-200' :
                      'bg-red-900 text-red-200'
                    }`}>
                      {invoice.status}
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
