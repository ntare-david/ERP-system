import { Plus } from 'lucide-react'
import { DataTable } from '../../components/DataTable'
import { useState } from 'react'

export default function Pricelists() {
  const [pricelists] = useState<any[]>([])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Pricelists</h1>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={18} /> New Pricelist
        </button>
      </div>
      <DataTable
        columns={[
          { key: 'id', label: 'Pricelist ID' },
          { key: 'name', label: 'Name' },
          { key: 'description', label: 'Description' },
          { key: 'status', label: 'Status' },
          { key: 'items', label: 'Items' },
        ]}
        data={pricelists}
      />
    </div>
  )
}
