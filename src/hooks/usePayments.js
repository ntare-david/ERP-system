import { useState, useEffect, useCallback } from 'react'
import { accountingApi } from '../api/accounting'
import { handleApiError } from '../utils/errorHandler'

export function usePayments() {
  const [payments, setPayments] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadPayments = useCallback(async () => {
    try {
      setError(null)
      setLoading(true)
      const response = await accountingApi.getPayments()
      setPayments(response.data || [])
    } catch (err) {
      const appError = handleApiError(err)
      const error = new Error(appError.message)
      setError(error)
      setPayments([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadPayments()
  }, [loadPayments])

  return { payments, error, loading, refetch: loadPayments }
}

