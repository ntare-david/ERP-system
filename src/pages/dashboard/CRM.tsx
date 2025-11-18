import { Routes, Route, Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { DataTable } from '../../components/DataTable'
import Pipeline from './Pipeline'
import Opportunities from './Opportunities'
import { useState } from 'react'

function Leads() {
  const [leads] = useState<any[]>([])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Leads</h1>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={18} /> New Lead
        </button>
      </div>
      <DataTable
        columns={[
          { key: 'id', label: 'Lead ID' },
          { key: 'name', label: 'Name' },
          { key: 'company', label: 'Company' },
          { key: 'email', label: 'Email' },
          { key: 'status', label: 'Status' },
        ]}
        data={leads}
      />
    </div>
  )
}

export default function CRM() {
  return (
    <Routes>
      <Route path="/leads" element={<Leads />} />
      <Route path="/pipeline" element={<Pipeline />} />
      <Route path="/opportunities" element={<Opportunities />} />
      <Route
        path="/"
        element={
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">CRM</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="leads" className="card hover:shadow-md transition-shadow">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Leads</h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Manage sales leads</p>
              </Link>
              <Link to="pipeline" className="card hover:shadow-md transition-shadow">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Pipeline</h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Track deal stages</p>
              </Link>
              <Link to="opportunities" className="card hover:shadow-md transition-shadow">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Opportunities</h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Manage opportunities</p>
              </Link>
            </div>
          </div>
        }
      />
    </Routes>
  )
}
