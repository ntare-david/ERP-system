import { Routes, Route, Link } from 'react-router-dom'
import { Plus, RefreshCw, AlertCircle } from 'lucide-react'
import { DataTable } from '../../components/DataTable'
import { TableSkeleton } from '../../components/Skeleton'
import Ledger from './Ledger'
import { useInvoices } from '../../hooks/useInvoices'
import { usePayments } from '../../hooks/usePayments'
import { memo, useMemo } from 'react'

const Invoices = memo(function Invoices() {
  const { invoices, error, loading, refetch } = useInvoices()

  const tableData = useMemo(() => {
    return invoices.map(inv => ({
      id: inv.id,
      customer: inv.customer,
      amount: `$${inv.amount.toLocaleString()}`,
      status: inv.status,
      date: new Date(inv.date).toLocaleDateString(),
    }))
  }, [invoices])

  return (
    <div className="space-y-4 p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Invoices</h1>
        <button className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto">
          <Plus size={18} /> <span className="hidden sm:inline">New Invoice</span><span className="sm:hidden">New</span>
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
              onClick={() => refetch()}
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
            { key: 'id', label: 'Invoice ID' },
            { key: 'customer', label: 'Customer' },
            { key: 'amount', label: 'Amount' },
            { key: 'status', label: 'Status' },
            { key: 'date', label: 'Date' },
          ]}
          data={tableData}
        />
      )}
    </div>
  )
})

const Payments = memo(function Payments() {
  const { payments, error, loading, refetch } = usePayments()

  const tableData = useMemo(() => {
    return payments.map(pay => ({
      id: pay.id,
      invoice: pay.invoice_id,
      amount: `$${pay.amount.toLocaleString()}`,
      method: pay.method,
      date: new Date(pay.date).toLocaleDateString(),
    }))
  }, [payments])

  return (
    <div className="space-y-4 p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Payments</h1>
        <button className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto">
          <Plus size={18} /> <span className="hidden sm:inline">Record Payment</span><span className="sm:hidden">Record</span>
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
              onClick={() => refetch()}
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
            { key: 'id', label: 'Payment ID' },
            { key: 'invoice', label: 'Invoice' },
            { key: 'amount', label: 'Amount' },
            { key: 'method', label: 'Method' },
            { key: 'date', label: 'Date' },
          ]}
          data={tableData}
        />
      )}
    </div>
  )
})

export default function Accounting() {
  return (
    <Routes>
      <Route path="/invoices" element={<Invoices />} />
      <Route path="/payments" element={<Payments />} />
      <Route path="/ledger" element={<Ledger />} />
      <Route
        path="/"
        element={
          <div className="space-y-4 p-4 md:p-6">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Accounting</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link to="invoices" className="card hover:shadow-md transition-shadow">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Invoices</h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Manage customer invoices</p>
              </Link>
              <Link to="payments" className="card hover:shadow-md transition-shadow">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Payments</h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Track payment records</p>
              </Link>
              <Link to="ledger" className="card hover:shadow-md transition-shadow">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Ledger</h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">View financial ledger</p>
              </Link>
            </div>
          </div>
        }
      />
    </Routes>
  )
}

