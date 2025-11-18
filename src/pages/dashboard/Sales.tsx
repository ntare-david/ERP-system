import { Routes, Route, Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { DataTable } from '../../components/DataTable'
import Pricelists from './Pricelists'
import { useState } from 'react'

function Products() {
  const [products] = useState<any[]>([])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Products</h1>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={18} /> New Product
        </button>
      </div>
      <DataTable
        columns={[
          { key: 'id', label: 'Product ID' },
          { key: 'name', label: 'Name' },
          { key: 'category', label: 'Category' },
          { key: 'price', label: 'Price' },
          { key: 'stock', label: 'Stock' },
        ]}
        data={products}
      />
    </div>
  )
}

function Orders() {
  const [orders] = useState<any[]>([])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Sales Orders</h1>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={18} /> New Order
        </button>
      </div>
      <DataTable
        columns={[
          { key: 'id', label: 'Order ID' },
          { key: 'customer', label: 'Customer' },
          { key: 'total', label: 'Total' },
          { key: 'status', label: 'Status' },
          { key: 'date', label: 'Date' },
        ]}
        data={orders}
      />
    </div>
  )
}

export default function Sales() {
  return (
    <Routes>
      <Route path="/products" element={<Products />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/pricelists" element={<Pricelists />} />
      <Route
        path="/"
        element={
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Sales</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="products" className="card hover:shadow-md transition-shadow">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Products</h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Manage your products</p>
              </Link>
              <Link to="pricelists" className="card hover:shadow-md transition-shadow">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Pricelists</h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Set pricing rules</p>
              </Link>
              <Link to="orders" className="card hover:shadow-md transition-shadow">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Orders</h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Track sales orders</p>
              </Link>
            </div>
          </div>
        }
      />
    </Routes>
  )
}
