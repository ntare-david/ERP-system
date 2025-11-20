import { useState, useEffect, useCallback, useMemo } from 'react'
import { accountingApi } from '../api/accounting'
import { handleApiError } from '../utils/errorHandler'

export function useDashboardStats() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalInventory: 0,
    activeUsers: 0,
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadStats = useCallback(async () => {
    try {
      setError(null)
      setLoading(true)
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
    } catch (err) {
      const appError = handleApiError(err)
      const error = new Error(appError.message)
      setError(error)
      setStats({
        totalRevenue: 0,
        totalOrders: 0,
        totalInventory: 0,
        activeUsers: 0,
      })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadStats()
  }, [loadStats])

  const formattedStats = useMemo(() => ({
    ...stats,
    formattedRevenue: `$${stats.totalRevenue.toLocaleString()}`,
  }), [stats])

  return { stats: formattedStats, error, loading, refetch: loadStats }
}

