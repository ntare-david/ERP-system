import { Plus } from 'lucide-react'
import { DataTable } from '../../components/DataTable'
import { useState } from 'react'

export default function Leaves() {
  const [leaves] = useState([
    { id: 'LEAVE-001', employee: 'Alice Johnson', type: 'Annual', from: '2024-02-01', to: '2024-02-05', status: 'Approved' },
    { id: 'LEAVE-002', employee: 'Bob Williams', type: 'Sick', from: '2024-01-20', to: '2024-01-22', status: 'Pending' },
  ])

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
