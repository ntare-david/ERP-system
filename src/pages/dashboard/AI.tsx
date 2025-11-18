import { Zap, Mail, TrendingUp, Package } from 'lucide-react'

export default function AI() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">AI Features</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center gap-3 mb-4">
            <Zap size={24} className="text-yellow-600" />
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">AI Summaries</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Get AI-generated summaries of your business data and performance metrics.
          </p>
        </div>

        <div className="card hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center gap-3 mb-4">
            <Mail size={24} className="text-blue-600" />
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Email Generator</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Generate professional emails for customers and clients automatically.
          </p>
        </div>

        <div className="card hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp size={24} className="text-green-600" />
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Sales Forecasting</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Predict future sales trends using advanced AI algorithms.
          </p>
        </div>

        <div className="card hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center gap-3 mb-4">
            <Package size={24} className="text-purple-600" />
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Inventory Prediction</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Get AI-powered inventory level predictions and recommendations.
          </p>
        </div>
      </div>
    </div>
  )
}
