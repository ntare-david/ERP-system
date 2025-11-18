import { Plus } from 'lucide-react'
import { DataTable } from '../../components/DataTable'
import { useState } from 'react'

export default function Leaves() {
  const [leaves] = useState<any[]>([])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Leaves</h1>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={18} /> Request Leave
        </button>
      </div>
      <DataTable
        columns={[
          { key: 'id', label: 'Leave ID' },
          { key: 'employee', label: 'Employee' },
          { key: 'type', label: 'Type' },
          { key: 'from', label: 'From' },
          { key: 'to', label: 'To' },
          { key: 'status', label: 'Status' },
        ]}
        data={leaves}
      />
    </div>
  )
}
