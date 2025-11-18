'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, BarChart3, ShoppingCart, Package, Users, FileText, Settings, FileJson, Zap, Sparkles } from 'lucide-react'
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { label: 'Modules', divider: true },
  { href: '/dashboard/accounting', icon: FileText, label: 'Accounting' },
  { href: '/dashboard/sales', icon: ShoppingCart, label: 'Sales' },
  { href: '/dashboard/inventory', icon: Package, label: 'Inventory' },
  { href: '/dashboard/crm', icon: Users, label: 'CRM' },
  { href: '/dashboard/hr', icon: Users, label: 'HR' },
  { label: 'Tools', divider: true },
  { href: '/dashboard/website-builder', icon: FileJson, label: 'Website Builder' },
  { href: '/dashboard/workflows', icon: Zap, label: 'Workflows' },
  { href: '/dashboard/reports', icon: BarChart3, label: 'Reports' },
  { href: '/dashboard/ai', icon: Sparkles, label: 'AI Features' },
  { label: 'Administration', divider: true },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
]
export function Sidebar() {
  const pathname = usePathname()
  const user = { company: 'ACME' }

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">ORM</span>
          </div>
          <span className="font-bold text-white">ORM System</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-auto px-3 py-4 space-y-2">
        {navItems.map((item, idx) => {
          if (item.divider) {
            return (
              <div key={idx} className="pt-4 pb-2">
                <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">{item.label}</p>
              </div>
            )
          }
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href!}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              )}
            >
              {Icon ? <Icon className="w-5 h-5" /> : <span className="w-5 h-5" />}
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Company Selector */}
      <div className="border-t border-slate-800 p-4 space-y-3">
        <div className="text-xs text-slate-400 font-semibold">COMPANY</div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-xs text-slate-400">
            AC
          </div>
          <span className="text-sm text-slate-300">{user?.company}</span>
        </div>
      </div>
    </div>
  )
}
