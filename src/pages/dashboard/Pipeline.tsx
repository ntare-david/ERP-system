import { Plus } from 'lucide-react'
import { DataTable } from '../../components/DataTable'
import { useState } from 'react'

export default function Pipeline() {
  const [deals] = useState([
    { id: 'DEAL-001', name: 'Tech Deal', amount: 50000, stage: 'Proposal', probability: '75%', date: '2024-01-15' },
    { id: 'DEAL-002', name: 'Services Deal', amount: 30000, stage: 'Negotiation', probability: '50%', date: '2024-01-16' },
  ])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Sales Pipeline</h1>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={18} /> New Deal
        </button>
      </div>
      <DataTable
        columns={[
          { key: 'id', label: 'Deal ID' },
          { key: 'name', label: 'Deal Name' },
          { key: 'amount', label: 'Amount' },
          { key: 'stage', label: 'Stage' },
          { key: 'probability', label: 'Probability' },
          { key: 'date', label: 'Date' },
        ]}
        data={deals}
      />
    </div>
  )
}
