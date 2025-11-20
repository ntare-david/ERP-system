import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X, LayoutDashboard, Users, ShoppingCart, Package, Briefcase, FileText, Zap, Settings, ChevronDown } from 'lucide-react'

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { 
      label: 'Accounting', 
      icon: FileText, 
      submenu: [
        { label: 'Invoices', path: '/dashboard/accounting/invoices' },
        { label: 'Payments', path: '/dashboard/accounting/payments' },
        { label: 'Ledger', path: '/dashboard/accounting/ledger' },
      ]
    },
    { 
      label: 'Sales', 
      icon: ShoppingCart, 
      submenu: [
        { label: 'Products', path: '/dashboard/sales/products' },
        { label: 'Pricelists', path: '/dashboard/sales/pricelists' },
        { label: 'Orders', path: '/dashboard/sales/orders' },
      ]
    },
    { 
      label: 'Inventory', 
      icon: Package, 
      submenu: [
        { label: 'Stock Levels', path: '/dashboard/inventory/stock' },
        { label: 'Stock Moves', path: '/dashboard/inventory/moves' },
        { label: 'Picking', path: '/dashboard/inventory/picking' },
      ]
    },
    { 
      label: 'CRM', 
      icon: Briefcase, 
      submenu: [
        { label: 'Leads', path: '/dashboard/crm/leads' },
        { label: 'Pipeline', path: '/dashboard/crm/pipeline' },
        { label: 'Opportunities', path: '/dashboard/crm/opportunities' },
      ]
    },
    { 
      label: 'HR', 
      icon: Users, 
      submenu: [
        { label: 'Employees', path: '/dashboard/hr/employees' },
        { label: 'Attendance', path: '/dashboard/hr/attendance' },
        { label: 'Leaves', path: '/dashboard/hr/leaves' },
      ]
    },
    { label: 'Reports', icon: FileText, path: '/dashboard/reports' },
    { label: 'Workflows', icon: Zap, path: '/dashboard/workflows' },
    { label: 'Settings', icon: Settings, path: '/dashboard/settings' },
  ]

  const [expandedMenu, setExpandedMenu] = useState(null)

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-slate-800 text-white shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-slate-900 text-slate-100 border-r border-slate-700 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <Link 
          to="/dashboard" 
          className="h-16 flex items-center gap-3 px-6 border-b border-slate-700 hover:bg-slate-800/50 transition-colors cursor-pointer"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">ORM</span>
          </div>
          <h1 className="text-lg font-bold text-blue-400">ORM System</h1>
        </Link>

        <nav className="overflow-y-auto h-[calc(100vh-4rem)] p-4 space-y-2">
          {menuItems.map((item) => (
            <div key={item.label}>
              {item.submenu ? (
                <div>
                  <button
                    onClick={() => setExpandedMenu(expandedMenu === item.label ? null : item.label)}
                    className="w-full flex items-center justify-between px-4 py-2 rounded-lg hover:bg-slate-800 text-slate-300 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={20} />
                      <span>{item.label}</span>
                    </div>
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${expandedMenu === item.label ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {expandedMenu === item.label && (
                    <div className="ml-4 space-y-1 mt-1">
                      {item.submenu.map((sub) => (
                        <NavLink
                          key={sub.path}
                          to={sub.path}
                          className={({ isActive }) =>
                            `block px-4 py-2 rounded-lg text-sm transition-colors ${
                              isActive
                                ? 'bg-blue-600 text-white'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                            }`
                          }
                        >
                          {sub.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`
                  }
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </NavLink>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {isOpen && <div className="md:hidden fixed inset-0 bg-black/50 z-30" onClick={() => setIsOpen(false)} />}
    </>
  )
}

