import { Routes, Route, Link } from 'react-router-dom'
import StockLevels from './Movements'
import StockMoves from './Movements'
import StockPicking from './Picking'

export default function Inventory() {
  return (
    <Routes>
      <Route path="/stock" element={<StockLevels />} />
      <Route path="/moves" element={<StockMoves />} />
      <Route path="/picking" element={<StockPicking />} />
      <Route
        path="/"
        element={
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Inventory</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="stock" className="card hover:shadow-md transition-shadow">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Stock Levels</h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">View inventory status</p>
              </Link>
              <Link to="moves" className="card hover:shadow-md transition-shadow">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Stock Moves</h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Track movements</p>
              </Link>
              <Link to="picking" className="card hover:shadow-md transition-shadow">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Picking</h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Manage pick operations</p>
              </Link>
            </div>
          </div>
        }
      />
    </Routes>
  )
}
