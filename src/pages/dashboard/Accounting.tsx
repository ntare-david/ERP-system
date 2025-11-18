import { Routes, Route, Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { DataTable } from '../../components/DataTable'
import Ledger from './Ledger'
import { useState, useEffect } from 'react'
import { accountingApi, Invoice, Payment } from '../../api/accounting'

function Invoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([])

  useEffect(() => {
    loadInvoices()
  }, [])

  const loadInvoices = async () => {
    try {
      const response = await accountingApi.getInvoices()
      setInvoices(response.data || [])
    } catch (error) {
      console.error('Failed to load invoices:', error)
      setInvoices([])
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Invoices</h1>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={18} /> New Invoice
        </button>
      </div>
      <DataTable
        columns={[
          { key: 'id', label: 'Invoice ID' },
          { key: 'customer', label: 'Customer' },
          { key: 'amount', label: 'Amount' },
          { key: 'status', label: 'Status' },
          { key: 'date', label: 'Date' },
        ]}
        data={invoices.map(inv => ({
          id: inv.id,
          customer: inv.customer,
          amount: `$${inv.amount.toLocaleString()}`,
          status: inv.status,
          date: new Date(inv.date).toLocaleDateString(),
        }))}
      />
    </div>
  )
}

function Payments() {
  const [payments, setPayments] = useState<Payment[]>([])

  useEffect(() => {
    loadPayments()
  }, [])

  const loadPayments = async () => {
    try {
      const response = await accountingApi.getPayments()
      setPayments(response.data || [])
    } catch (error) {
      console.error('Failed to load payments:', error)
      setPayments([])
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Payments</h1>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={18} /> Record Payment
        </button>
      </div>
      <DataTable
        columns={[
          { key: 'id', label: 'Payment ID' },
          { key: 'invoice', label: 'Invoice' },
          { key: 'amount', label: 'Amount' },
          { key: 'method', label: 'Method' },
          { key: 'date', label: 'Date' },
        ]}
        data={payments.map(pay => ({
          id: pay.id,
          invoice: pay.invoice_id,
          amount: `$${pay.amount.toLocaleString()}`,
          method: pay.method,
          date: new Date(pay.date).toLocaleDateString(),
        }))}
      />
    </div>
  )
}

export default function Accounting() {
  return (
    <Routes>
      <Route path="/invoices" element={<Invoices />} />
      <Route path="/payments" element={<Payments />} />
      <Route path="/ledger" element={<Ledger />} />
      <Route
        path="/"
        element={
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Accounting</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
