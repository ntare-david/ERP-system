'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { ArrowUpRight, ArrowDownRight, TrendingUp, Users, ShoppingCart, Package } from 'lucide-react'

const kpiData = [
  { label: 'Revenue', value: '$1.24M', change: '+12.5%', trend: 'up' },
  { label: 'Orders', value: '3,428', change: '+8.2%', trend: 'up' },
  { label: 'Inventory', value: '12,847', change: '-2.1%', trend: 'down' },
  { label: 'Customers', value: '2,156', change: '+5.4%', trend: 'up' },
]

const chartData = [
  { month: 'Jan', revenue: 40000, expenses: 24000, profit: 16000 },
  { month: 'Feb', revenue: 50000, expenses: 28000, profit: 22000 },
  { month: 'Mar', revenue: 55000, expenses: 30000, profit: 25000 },
  { month: 'Apr', revenue: 60000, expenses: 32000, profit: 28000 },
  { month: 'May', revenue: 65000, expenses: 35000, profit: 30000 },
  { month: 'Jun', revenue: 70000, expenses: 38000, profit: 32000 },
]

const invoiceData = [
  { name: 'Paid', value: 65 },
  { name: 'Pending', value: 25 },
  { name: 'Overdue', value: 10 },
]

const colors = ['#3b82f6', '#f59e0b', '#ef4444']

const activityLog = [
  { id: 1, action: 'Invoice #2401 created', user: 'John Doe', time: '2 hours ago' },
  { id: 2, action: 'Purchase Order approved', user: 'Jane Smith', time: '4 hours ago' },
  { id: 3, action: 'Stock adjustment completed', user: 'Mike Johnson', time: '6 hours ago' },
  { id: 4, action: 'New lead added', user: 'Sarah Williams', time: '8 hours ago' },
]

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 mt-1">Welcome back! Here's what's happening with your business.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, idx) => (
          <Card key={idx} className="bg-slate-900 border-slate-800">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-400 text-sm">{kpi.label}</p>
                  <p className="text-2xl font-bold text-white mt-2">{kpi.value}</p>
                </div>
                <div className={`flex items-center gap-1 text-sm ${kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {kpi.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {kpi.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Revenue Trend</CardTitle>
            <CardDescription className="text-slate-400">Monthly revenue, expenses, and profit</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#e2e8f0' }} />
                <Legend />
                <Bar dataKey="revenue" fill="#3b82f6" />
                <Bar dataKey="expenses" fill="#f59e0b" />
                <Bar dataKey="profit" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Invoice Status</CardTitle>
            <CardDescription className="text-slate-400">Distribution overview</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={invoiceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {invoiceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#e2e8f0' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {invoiceData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[idx] }}></div>
                    <span className="text-slate-300">{item.name}</span>
                  </div>
                  <span className="text-white font-semibold">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Log */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Recent Activity</CardTitle>
          <CardDescription className="text-slate-400">Latest actions in your business</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activityLog.map((activity) => (
              <div key={activity.id} className="flex items-start justify-between border-b border-slate-800 pb-4 last:border-0">
                <div>
                  <p className="text-white font-medium text-sm">{activity.action}</p>
                  <p className="text-slate-500 text-xs mt-1">by {activity.user}</p>
                </div>
                <span className="text-slate-400 text-xs">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

