import { useState, useCallback, useEffect } from 'react'

export function useApi(apiCall, options = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await apiCall()
      setData(response.data)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [apiCall])

  useEffect(() => {
    if (options.autoFetch !== false) {
      fetch()
    }
  }, [])

  return { data, loading, error, refetch: fetch }
}

