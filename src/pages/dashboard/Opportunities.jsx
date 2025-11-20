import { Plus, RefreshCw, AlertCircle } from 'lucide-react'
import { DataTable } from '../../components/DataTable'
import { TableSkeleton } from '../../components/Skeleton'
import { useState, useEffect, useCallback, useMemo, memo } from 'react'
import { apiClient } from '../../api/client'
import { handleApiError } from '../../utils/errorHandler'

const Opportunities = memo(function Opportunities() {
  const [opportunities, setOpportunities] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadOpportunities = useCallback(async () => {
    try {
      setError(null)
      setLoading(true)
      const response = await apiClient.get('/crm/opportunities')
      setOpportunities(response.data || [])
    } catch (err) {
      const appError = handleApiError(err)
      const error = new Error(appError.message)
      setError(error)
      setOpportunities([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadOpportunities()
  }, [loadOpportunities])

  const tableData = useMemo(() => {
    return opportunities.map(opp => ({
      id: opp.id,
      title: opp.title || 'N/A',
      lead: opp.lead_name || 'N/A',
      value: `$${opp.value?.toLocaleString() || '0'}`,
      status: opp.status || 'New',
      date: opp.date ? new Date(opp.date).toLocaleDateString() : 'N/A',
    }))
  }, [opportunities])

  return (
    <div className="space-y-4 p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Opportunities</h1>
        <button className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto">
          <Plus size={18} /> <span className="hidden sm:inline">New Opportunity</span><span className="sm:hidden">New</span>
        </button>
      </div>
      
      {loading ? (
        <div className="card">
          <TableSkeleton rows={5} columns={6} />
        </div>
      ) : error ? (
        <div className="card">
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
              <AlertCircle size={24} className="text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Network Error</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 text-center mb-6 max-w-md">
              {error.message}
            </p>
            <button
              onClick={() => loadOpportunities()}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw size={18} />
              Retry
            </button>
          </div>
        </div>
      ) : (
        <DataTable
          columns={[
            { key: 'id', label: 'Opportunity ID' },
            { key: 'title', label: 'Title' },
            { key: 'lead', label: 'Lead' },
            { key: 'value', label: 'Value' },
            { key: 'status', label: 'Status' },
            { key: 'date', label: 'Date' },
          ]}
          data={tableData}
        />
      )}
    </div>
  )
})

export default Opportunities

