import { useState, useCallback, useEffect } from 'react'
import { AxiosError } from 'axios'

interface UseApiOptions {
  autoFetch?: boolean
}

export function useApi<T>(
  apiCall: () => Promise<any>,
  options: UseApiOptions = {}
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<AxiosError | null>(null)

  const fetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await apiCall()
      setData(response.data)
    } catch (err) {
      setError(err as AxiosError)
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
