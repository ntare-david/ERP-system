import { DataTable } from '../../components/DataTable'
import { TableSkeleton } from '../../components/Skeleton'
import { useState, useEffect, useMemo, memo } from 'react'
import { useLedger } from '../../hooks/useLedger'
import { RefreshCw, AlertCircle } from 'lucide-react'

const Ledger = memo(function Ledger() {
  const { ledgerData, error, loading, refetch } = useLedger()
  const [selectedAccount, setSelectedAccount] = useState(null)

  useEffect(() => {
    if (ledgerData.length > 0 && !selectedAccount) {
      setSelectedAccount(ledgerData[0].account.id)
    }
  }, [ledgerData, selectedAccount])

  const selectedAccountData = useMemo(
    () => ledgerData.find(acc => acc.account.id === selectedAccount),
    [ledgerData, selectedAccount]
  )

  const entries = useMemo(() => {
    return (selectedAccountData?.entries || []).map(entry => ({
      id: entry.id,
      date: new Date(entry.date).toLocaleDateString(),
      description: entry.description,
      debit: entry.debit > 0 ? `$${entry.debit.toLocaleString()}` : '-',
      credit: entry.credit > 0 ? `$${entry.credit.toLocaleString()}` : '-',
      balance: `$${entry.balance.toLocaleString()}`,
    }))
  }, [selectedAccountData])

  if (loading) {
    return (
      <div className="space-y-4 p-4 md:p-6">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">General Ledger</h1>
        <div className="card">
          <TableSkeleton rows={5} columns={6} />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4 p-4 md:p-6">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">General Ledger</h1>
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
      </div>
    )
  }

  return (
    <div className="space-y-4 p-4 md:p-6">
      <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">General Ledger</h1>
      
      {ledgerData.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-lg font-medium text-slate-600 dark:text-slate-400">No accounts found</p>
          <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">Create accounts to see ledger entries</p>
        </div>
      ) : (
        <>
          <div className="card">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Select Account
            </label>
            <select
              value={selectedAccount || ''}
              onChange={(e) => setSelectedAccount(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm md:text-base"
            >
              {ledgerData.map((acc) => (
                <option key={acc.account.id} value={acc.account.id}>
                  {acc.account.name} ({acc.account.code}) - Balance: ${acc.account.balance.toLocaleString()}
                </option>
              ))}
            </select>
          </div>

          {selectedAccountData && (
            <div className="card">
              <h2 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-4">
                {selectedAccountData.account.name} - {selectedAccountData.account.code}
              </h2>
              <DataTable
                columns={[
                  { key: 'id', label: 'Entry ID' },
                  { key: 'date', label: 'Date' },
                  { key: 'description', label: 'Description' },
                  { key: 'debit', label: 'Debit' },
                  { key: 'credit', label: 'Credit' },
                  { key: 'balance', label: 'Balance' },
                ]}
                data={entries}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
})

export default Ledger

