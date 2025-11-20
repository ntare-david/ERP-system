import { useState, useEffect, useCallback } from 'react'
import { accountingApi } from '../api/accounting'
import { handleApiError } from '../utils/errorHandler'

export function useInvoices() {
  const [invoices, setInvoices] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadInvoices = useCallback(async () => {
    try {
      setError(null)
      setLoading(true)
      const response = await accountingApi.getInvoices()
      setInvoices(response.data || [])
    } catch (err) {
      const appError = handleApiError(err)
      const error = new Error(appError.message)
      setError(error)
      setInvoices([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadInvoices()
  }, [loadInvoices])

  return { invoices, error, loading, refetch: loadInvoices }
}

