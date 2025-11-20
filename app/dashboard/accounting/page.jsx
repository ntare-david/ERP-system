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
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      <ModuleHeader title="Accounting" description="Manage invoices, payments, and ledger" />

      {/* Tabs */}
      <div className="overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0">
        <div className="flex gap-2 border-b border-slate-800 min-w-max md:min-w-0">
          {['Invoices', 'Payments', 'Ledger'].map((tab) => (
            <button
              key={tab}
              className="px-3 md:px-4 py-2 border-b-2 border-transparent text-slate-400 hover:text-white hover:border-blue-600 transition whitespace-nowrap text-sm md:text-base"
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
          <Input
            type="text"
            placeholder="Search invoices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-800 border-slate-700 text-white"
          />
        </div>
        <Button variant="outline" className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700 w-full sm:w-auto">
          <Filter className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Filter</span>
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">New Invoice</span>
          <span className="sm:hidden">New</span>
        </Button>
      </div>

      {/* Table - Mobile Card View */}
      <div className="block md:hidden space-y-3">
        {invoices.map((invoice) => (
          <Card key={invoice.id} className="bg-slate-900 border-slate-800">
            <CardContent className="pt-4 p-4 space-y-2">
              <div className="flex justify-between items-start">
                <span className="text-xs font-semibold text-slate-400 uppercase">Invoice ID</span>
                <span className="text-slate-200 font-medium">{invoice.id}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-xs font-semibold text-slate-400 uppercase">Client</span>
                <span className="text-slate-200">{invoice.client}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-xs font-semibold text-slate-400 uppercase">Amount</span>
                <span className="text-slate-200 font-semibold">{invoice.amount}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-xs font-semibold text-slate-400 uppercase">Date</span>
                <span className="text-slate-200">{invoice.date}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-xs font-semibold text-slate-400 uppercase">Status</span>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  invoice.status === 'Paid' ? 'bg-green-900 text-green-200' :
                  invoice.status === 'Pending' ? 'bg-yellow-900 text-yellow-200' :
                  'bg-red-900 text-red-200'
                }`}>
                  {invoice.status}
                </span>
              </div>
              <div className="flex gap-2 pt-2 border-t border-slate-800">
                <button className="flex-1 p-2 hover:bg-slate-800 rounded text-slate-400 hover:text-white flex items-center justify-center">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </button>
                <button className="flex-1 p-2 hover:bg-slate-800 rounded text-slate-400 hover:text-red-400 flex items-center justify-center">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table - Desktop View */}
      <Card className="hidden md:block bg-slate-900 border-slate-800">
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
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
                    <td className="py-3 px-4 text-right">
                      <div className="flex gap-2 justify-end">
                        <button className="p-2 hover:bg-slate-700 rounded text-slate-400 hover:text-white">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-slate-700 rounded text-slate-400 hover:text-red-400">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

