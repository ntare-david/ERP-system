export default function Reports() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Reports</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="card hover:shadow-md transition-shadow">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Sales Report</h2>
          <p className="text-slate-600 dark:text-slate-400">Generate comprehensive sales analytics</p>
        </div>
        <div className="card hover:shadow-md transition-shadow">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Inventory Report</h2>
          <p className="text-slate-600 dark:text-slate-400">Track inventory levels and movements</p>
        </div>
      </div>
    </div>
  )
}

