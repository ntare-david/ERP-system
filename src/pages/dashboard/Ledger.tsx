import { DataTable } from '../../components/DataTable'
import { useState, useEffect } from 'react'
import { apiClient } from '../../api/client'

interface LedgerAccount {
  account: {
    id: string
    name: string
    account_type: string
    code: string
    balance: number
  }
  entries: Array<{
    id: string
    date: string
    description: string
    debit: number
    credit: number
    balance: number
  }>
}

export default function Ledger() {
  const [ledgerData, setLedgerData] = useState<LedgerAccount[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null)

  useEffect(() => {
    loadLedger()
  }, [])

  const loadLedger = async () => {
    try {
      const response = await apiClient.get<LedgerAccount[]>('/accounting/ledger')
      setLedgerData(response.data || [])
      if (response.data && response.data.length > 0 && !selectedAccount) {
        setSelectedAccount(response.data[0].account.id)
      }
    } catch (error) {
      console.error('Failed to load ledger:', error)
      setLedgerData([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">General Ledger</h1>
        <div className="text-center py-8 text-slate-500 dark:text-slate-400">Loading...</div>
      </div>
    )
  }

  const selectedAccountData = ledgerData.find(acc => acc.account.id === selectedAccount)
  const entries = selectedAccountData?.entries || []

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">General Ledger</h1>
      
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
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
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
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
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
                data={entries.map(entry => ({
                  id: entry.id,
                  date: new Date(entry.date).toLocaleDateString(),
                  description: entry.description,
                  debit: entry.debit > 0 ? `$${entry.debit.toLocaleString()}` : '-',
                  credit: entry.credit > 0 ? `$${entry.credit.toLocaleString()}` : '-',
                  balance: `$${entry.balance.toLocaleString()}`,
                }))}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}
