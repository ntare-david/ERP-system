import { Plus } from 'lucide-react'
import { DataTable } from '../../components/DataTable'
import { useState } from 'react'

export default function Pricelists() {
  const [pricelists] = useState([
    { id: 'PL-001', name: 'Standard', description: 'Standard pricing for all customers', status: 'Active', items: 45 },
    { id: 'PL-002', name: 'Wholesale', description: 'Bulk pricing discount', status: 'Active', items: 120 },
    { id: 'PL-003', name: 'Enterprise', description: 'Custom enterprise pricing', status: 'Draft', items: 30 },
  ])

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
