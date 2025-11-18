import { Routes, Route, useNavigate } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar'
import { Topbar } from '../components/Topbar'
import DashboardHome from './dashboard/Home'
import Accounting from './dashboard/Accounting'
import Sales from './dashboard/Sales'
import Inventory from './dashboard/Inventory'
import CRM from './dashboard/CRM'
import HR from './dashboard/HR'
import Reports from './dashboard/Reports'
import Workflows from './dashboard/Workflows'
import Settings from './dashboard/Settings'

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-white dark:bg-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden md:ml-0">
        <Topbar />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <Routes>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/accounting/*" element={<Accounting />} />
              <Route path="/sales/*" element={<Sales />} />
              <Route path="/inventory/*" element={<Inventory />} />
              <Route path="/crm/*" element={<CRM />} />
              <Route path="/hr/*" element={<HR />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/workflows" element={<Workflows />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  )
}
