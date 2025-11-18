import { Plus } from 'lucide-react'
import { DataTable } from '../../components/DataTable'
import { useState } from 'react'

export default function StockMoves() {
  const [moves] = useState([
    { id: 'MOVE-001', item: 'Widget A', from: 'Warehouse A', to: 'Warehouse B', qty: 50, date: '2024-01-15' },
    { id: 'MOVE-002', item: 'Widget B', from: 'Warehouse B', to: 'Store 1', qty: 25, date: '2024-01-16' },
  ])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Stock Moves</h1>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={18} /> New Move
        </button>
      </div>
      <DataTable
        columns={[
          { key: 'id', label: 'Move ID' },
          { key: 'item', label: 'Item' },
          { key: 'from', label: 'From Location' },
          { key: 'to', label: 'To Location' },
          { key: 'qty', label: 'Quantity' },
          { key: 'date', label: 'Date' },
        ]}
        data={moves}
      />
    </div>
  )
}
