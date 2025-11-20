'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react'
import { ModuleHeader } from '@/components/modules/module-header'
import { Card, CardContent } from '@/components/ui/card'

const stock = [
  { id: 1, item: 'Item A', location: 'Warehouse 1', quantity: 500, min_level: 100, status: 'OK' },
  { id: 2, item: 'Item B', location: 'Warehouse 2', quantity: 45, min_level: 100, status: 'Low' },
  { id: 3, item: 'Item C', location: 'Warehouse 1', quantity: 1200, min_level: 200, status: 'OK' },
]

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="p-6 space-y-6">
      <ModuleHeader title="Inventory" description="Manage stock, moves, and picking" />

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-800">
        {['Stock Levels', 'Stock Moves', 'Stock Picking'].map((tab) => (
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
            placeholder="Search stock..."
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
          New Movement
        </Button>
      </div>

      {/* Table */}
      <Card className="bg-slate-900 border-slate-800">
        <CardContent className="pt-6">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase">Item</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase">Location</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase">Quantity</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase">Min Level</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase">Status</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-slate-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stock.map((item) => (
                <tr key={item.id} className="border-b border-slate-800 hover:bg-slate-800 transition">
                  <td className="py-3 px-4 text-slate-200">{item.item}</td>
                  <td className="py-3 px-4 text-slate-200">{item.location}</td>
                  <td className="py-3 px-4 text-slate-200">{item.quantity}</td>
                  <td className="py-3 px-4 text-slate-200">{item.min_level}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      item.status === 'OK' ? 'bg-green-900 text-green-200' : 'bg-yellow-900 text-yellow-200'
                    }`}>
                      {item.status}
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

