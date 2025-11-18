import { Routes, Route, Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { DataTable } from '../../components/DataTable'
import Attendance from './Attendance'
import Leaves from './Leaves'
import { useState } from 'react'

function Employees() {
  const [employees] = useState<any[]>([])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Employees</h1>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={18} /> New Employee
        </button>
      </div>
      <DataTable
        columns={[
          { key: 'id', label: 'Employee ID' },
          { key: 'name', label: 'Name' },
          { key: 'department', label: 'Department' },
          { key: 'position', label: 'Position' },
          { key: 'status', label: 'Status' },
        ]}
        data={employees}
      />
    </div>
  )
}

export default function HR() {
  return (
    <Routes>
      <Route path="/employees" element={<Employees />} />
      <Route path="/attendance" element={<Attendance />} />
      <Route path="/leaves" element={<Leaves />} />
      <Route
        path="/"
        element={
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">HR Management</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="employees" className="card hover:shadow-md transition-shadow">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Employees</h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Manage employee records</p>
              </Link>
              <Link to="attendance" className="card hover:shadow-md transition-shadow">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Attendance</h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Track attendance</p>
              </Link>
              <Link to="leaves" className="card hover:shadow-md transition-shadow">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Leaves</h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Manage leave requests</p>
              </Link>
            </div>
          </div>
        }
      />
    </Routes>
  )
}
