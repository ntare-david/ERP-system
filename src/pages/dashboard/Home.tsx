import { DollarSign, Package, Users, ShoppingCart } from 'lucide-react'
import { useState, useEffect } from 'react'
import { accountingApi } from '../../api/accounting'

export default function DashboardHome() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalInventory: 0,
    activeUsers: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      // Load invoices to calculate revenue
      const invoicesResponse = await accountingApi.getInvoices()
      const invoices = invoicesResponse.data || []
      
      const paidInvoices = invoices.filter(inv => inv.status === 'paid')
      const totalRevenue = paidInvoices.reduce((sum, inv) => sum + inv.amount, 0)

      setStats({
        totalRevenue,
        totalOrders: invoices.length,
        totalInventory: 0, // Will be updated when inventory API is available
        activeUsers: 0, // Will be updated when user API is available
      })
    } catch (error) {
      console.error('Failed to load stats:', error)
      setStats({
        totalRevenue: 0,
        totalOrders: 0,
        totalInventory: 0,
        activeUsers: 0,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400">Welcome back to your ORM Management System</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Revenue</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
              {loading ? '...' : `$${stats.totalRevenue.toLocaleString()}`}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">From paid invoices</p>
          </div>
          <DollarSign size={32} className="text-blue-600" />
        </div>

        <div className="card flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Invoices</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
              {loading ? '...' : stats.totalOrders}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Total invoices</p>
          </div>
          <ShoppingCart size={32} className="text-green-600" />
        </div>

        <div className="card flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Inventory</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
              {loading ? '...' : stats.totalInventory}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Items in stock</p>
          </div>
          <Package size={32} className="text-orange-600" />
        </div>

        <div className="card flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Active Users</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
              {loading ? '...' : stats.activeUsers}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">System users</p>
          </div>
          <Users size={32} className="text-purple-600" />
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {loading ? (
            <div className="text-center py-8 text-slate-500 dark:text-slate-400">Loading...</div>
          ) : (
            <div className="text-center py-8 text-slate-500 dark:text-slate-400">
              <p className="text-lg font-medium">No recent activity</p>
              <p className="text-sm mt-2">Activity will appear here as you use the system</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
