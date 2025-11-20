import { Plus, RefreshCw, AlertCircle } from 'lucide-react'
import { DataTable } from '../../components/DataTable'
import { TableSkeleton } from '../../components/Skeleton'
import { useState, useEffect, useCallback, useMemo, memo } from 'react'
import { apiClient } from '../../api/client'
import { handleApiError } from '../../utils/errorHandler'

const Attendance = memo(function Attendance() {
  const [attendance, setAttendance] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadAttendance = useCallback(async () => {
    try {
      setError(null)
      setLoading(true)
      const response = await apiClient.get('/hr/attendance')
      setAttendance(response.data || [])
    } catch (err) {
      const appError = handleApiError(err)
      const error = new Error(appError.message)
      setError(error)
      setAttendance([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadAttendance()
  }, [loadAttendance])

  const tableData = useMemo(() => {
    return attendance.map(att => ({
      id: att.id,
      employee: att.employee_name || 'N/A',
      date: att.date ? new Date(att.date).toLocaleDateString() : 'N/A',
      status: att.status || 'Present',
      time: att.time || 'N/A',
    }))
  }, [attendance])

  return (
    <div className="space-y-4 p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Attendance</h1>
        <button className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto">
          <Plus size={18} /> <span className="hidden sm:inline">Mark Attendance</span><span className="sm:hidden">Mark</span>
        </button>
      </div>
      
      {loading ? (
        <div className="card">
          <TableSkeleton rows={5} columns={5} />
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
              onClick={() => loadAttendance()}
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
            { key: 'id', label: 'Employee ID' },
            { key: 'employee', label: 'Employee' },
            { key: 'date', label: 'Date' },
            { key: 'status', label: 'Status' },
            { key: 'time', label: 'Time' },
          ]}
          data={tableData}
        />
      )}
    </div>
  )
})

export default Attendance

