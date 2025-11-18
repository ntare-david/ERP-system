import { Plus } from 'lucide-react'
import { DataTable } from '../../components/DataTable'
import { useState } from 'react'

export default function StockPicking() {
  const [picks] = useState([
    { id: 'PICK-001', order: 'ORD-001', item: 'Widget A', qty: 10, status: 'Completed', date: '2024-01-15' },
    { id: 'PICK-002', order: 'ORD-002', item: 'Widget B', qty: 5, status: 'In Progress', date: '2024-01-16' },
  ])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Stock Picking</h1>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={18} /> New Pick
        </button>
      </div>
      <DataTable
        columns={[
          { key: 'id', label: 'Pick ID' },
          { key: 'order', label: 'Order ID' },
          { key: 'item', label: 'Item' },
          { key: 'qty', label: 'Quantity' },
          { key: 'status', label: 'Status' },
          { key: 'date', label: 'Date' },
        ]}
        data={picks}
      />
    </div>
  )
}
