import { useState, useEffect, useCallback } from 'react'
import { apiClient } from '../api/client'
import { handleApiError } from '../utils/errorHandler'

export function useLedger() {
  const [ledgerData, setLedgerData] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadLedger = useCallback(async () => {
    try {
      setError(null)
      setLoading(true)
      const response = await apiClient.get('/accounting/ledger')
      setLedgerData(response.data || [])
    } catch (err) {
      const appError = handleApiError(err)
      const error = new Error(appError.message)
      setError(error)
      setLedgerData([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadLedger()
  }, [loadLedger])

  return { ledgerData, error, loading, refetch: loadLedger }
}

