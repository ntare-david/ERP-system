import { Plus } from 'lucide-react'
import { DataTable } from '../../components/DataTable'
import { useState } from 'react'

export default function Opportunities() {
  const [opportunities] = useState<any[]>([])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Opportunities</h1>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={18} /> New Opportunity
        </button>
      </div>
      <DataTable
        columns={[
          { key: 'id', label: 'Opportunity ID' },
          { key: 'title', label: 'Title' },
          { key: 'lead', label: 'Lead' },
          { key: 'value', label: 'Value' },
          { key: 'status', label: 'Status' },
          { key: 'date', label: 'Date' },
        ]}
        data={opportunities}
      />
    </div>
  )
}
