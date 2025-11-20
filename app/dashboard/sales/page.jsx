'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react'
import { ModuleHeader } from '@/components/modules/module-header'
import { Card, CardContent } from '@/components/ui/card'

const products = [
  { id: 1, name: 'Product A', category: 'Electronics', price: '$299', stock: 45, sales: 128 },
  { id: 2, name: 'Product B', category: 'Software', price: '$99', stock: 120, sales: 456 },
  { id: 3, name: 'Product C', category: 'Services', price: '$1,500', stock: 8, sales: 23 },
]

export default function SalesPage() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="p-6 space-y-6">
      <ModuleHeader title="Sales" description="Manage products, pricing, and orders" />

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-800">
        {['Products', 'Pricelists', 'Orders'].map((tab) => (
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
            placeholder="Search products..."
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
          New Product
        </Button>
      </div>

      {/* Table */}
      <Card className="bg-slate-900 border-slate-800">
        <CardContent className="pt-6">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase">Product</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase">Category</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase">Price</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase">Stock</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase">Sales</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-slate-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-slate-800 hover:bg-slate-800 transition">
                  <td className="py-3 px-4 text-slate-200">{product.name}</td>
                  <td className="py-3 px-4 text-slate-200">{product.category}</td>
                  <td className="py-3 px-4 text-slate-200">{product.price}</td>
                  <td className="py-3 px-4 text-slate-200">{product.stock}</td>
                  <td className="py-3 px-4 text-slate-200">{product.sales}</td>
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

