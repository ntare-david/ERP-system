export default function Reports() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Reports</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Sales Report</h2>
          <p className="text-slate-600 dark:text-slate-400">Generate comprehensive sales analytics</p>
        </div>
        <div className="card">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Inventory Report</h2>
          <p className="text-slate-600 dark:text-slate-400">Track inventory levels and movements</p>
        </div>
      </div>
    </div>
  )
}
