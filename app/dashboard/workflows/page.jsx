'use client'

import { Button } from '@/components/ui/button'
import { Plus, Play, Edit, Trash2 } from 'lucide-react'
import { ModuleHeader } from '@/components/modules/module-header'
import { Card, CardContent } from '@/components/ui/card'

const workflows = [
  { id: 1, name: 'Auto Invoice Send', trigger: 'Invoice Created', status: 'Active', executions: 1250 },
  { id: 2, name: 'Lead Email Notification', trigger: 'New Lead', status: 'Active', executions: 856 },
  { id: 3, name: 'Low Stock Alert', trigger: 'Stock Below Threshold', status: 'Paused', executions: 342 },
]

export default function WorkflowsPage() {
  return (
    <div className="p-6 space-y-6">
      <ModuleHeader title="Automation Workflows" description="Create and manage automated business processes" />

      {/* Toolbar */}
      <div className="flex gap-3">
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          New Workflow
        </Button>
      </div>

      {/* Workflows List */}
      <div className="space-y-4">
        {workflows.map((workflow) => (
          <Card key={workflow.id} className="bg-slate-900 border-slate-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-semibold text-white">{workflow.name}</p>
                  <p className="text-sm text-slate-400 mt-1">Trigger: {workflow.trigger}</p>
                  <p className="text-xs text-slate-500 mt-1">{workflow.executions.toLocaleString()} executions</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded text-xs font-semibold ${
                    workflow.status === 'Active' ? 'bg-green-900 text-green-200' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {workflow.status}
                  </span>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-slate-800 rounded text-slate-400 hover:text-white">
                      <Play className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-slate-800 rounded text-slate-400 hover:text-white">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-slate-800 rounded text-slate-400 hover:text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

