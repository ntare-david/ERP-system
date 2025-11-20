import { Plus, RefreshCw, AlertCircle } from 'lucide-react'
import { DataTable } from '../../components/DataTable'
import { TableSkeleton } from '../../components/Skeleton'
import { useState, useEffect, useCallback, useMemo, memo } from 'react'
import { apiClient } from '../../api/client'
import { handleApiError } from '../../utils/errorHandler'

const StockMoves = memo(function StockMoves() {
  const [moves, setMoves] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadMoves = useCallback(async () => {
    try {
      setError(null)
      setLoading(true)
      const response = await apiClient.get('/inventory/moves')
      setMoves(response.data || [])
    } catch (err) {
      const appError = handleApiError(err)
      const error = new Error(appError.message)
      setError(error)
      setMoves([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadMoves()
  }, [loadMoves])

  const tableData = useMemo(() => {
    return moves.map(move => ({
      id: move.id,
      item: move.item || 'N/A',
      from: move.from_location || 'N/A',
      to: move.to_location || 'N/A',
      qty: move.quantity || 0,
      date: move.date ? new Date(move.date).toLocaleDateString() : 'N/A',
    }))
  }, [moves])

  return (
    <div className="space-y-4 p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Stock Moves</h1>
        <button className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto">
          <Plus size={18} /> <span className="hidden sm:inline">New Move</span><span className="sm:hidden">New</span>
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
              onClick={() => loadMoves()}
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
            { key: 'id', label: 'Move ID' },
            { key: 'item', label: 'Item' },
            { key: 'from', label: 'From Location' },
            { key: 'to', label: 'To Location' },
            { key: 'qty', label: 'Quantity' },
            { key: 'date', label: 'Date' },
          ]}
          data={tableData}
        />
      )}
    </div>
  )
})

export default StockMoves

