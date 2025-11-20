import { Routes, Route } from 'react-router-dom'
import { Sidebar } from '../../components/Sidebar'
import { Topbar } from '../../components/Topbar'
import DashboardHome from './Home'
import Accounting from './Accounting'
import Sales from './Sales'
import Inventory from './Inventory'
import CRM from './CRM'
import HR from './HR'
import Reports from './Reports'
import Workflows from './Workflows'
import Settings from './Settings'
import AI from './AI'
import WebsiteBuilder from './WebsiteBuilder'

export default function DashboardLayout() {
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
              <Route path="/ai" element={<AI />} />
              <Route path="/website-builder" element={<WebsiteBuilder />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  )
}

