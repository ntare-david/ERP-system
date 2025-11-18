import { Plus } from 'lucide-react'
import { DataTable } from '../../components/DataTable'
import { useState } from 'react'

export default function StockPicking() {
  const [picks] = useState<any[]>([])

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
