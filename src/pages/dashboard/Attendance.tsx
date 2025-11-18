import { Plus } from 'lucide-react'
import { DataTable } from '../../components/DataTable'
import { useState } from 'react'

export default function Attendance() {
  const [attendance] = useState<any[]>([])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Attendance</h1>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={18} /> Mark Attendance
        </button>
      </div>
      <DataTable
        columns={[
          { key: 'id', label: 'Employee ID' },
          { key: 'employee', label: 'Employee' },
          { key: 'date', label: 'Date' },
          { key: 'status', label: 'Status' },
          { key: 'time', label: 'Time' },
        ]}
        data={attendance}
      />
    </div>
  )
}
