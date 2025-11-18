'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Sparkles, Send, TrendingUp, Mail, AlertCircle } from 'lucide-react'
import { ModuleHeader } from '@/components/modules/module-header'
import { useState } from 'react'

export default function AIFeaturesPage() {
  const [selectedFeature, setSelectedFeature] = useState('summary')
  const [input, setInput] = useState('')

  const features = [
    { id: 'summary', name: 'AI Summaries', icon: Sparkles, description: 'Generate smart summaries of your data' },
    { id: 'email', name: 'Email Generator', icon: Mail, description: 'Create professional emails' },
    { id: 'forecast', name: 'Sales Forecasting', icon: TrendingUp, description: 'AI-powered sales predictions' },
    { id: 'inventory', name: 'Inventory Prediction', icon: AlertCircle, description: 'Predict inventory needs' },
  ]

  return (
    <div className="p-6 space-y-6">
      <ModuleHeader title="AI Features" description="Leverage artificial intelligence for business insights" />

      {/* Feature Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <Card
              key={feature.id}
              onClick={() => setSelectedFeature(feature.id)}
              className={`bg-slate-900 border-slate-800 cursor-pointer transition ${
                selectedFeature === feature.id ? 'border-blue-600' : 'hover:border-slate-700'
              }`}
            >
              <CardContent className="pt-6">
                <Icon className="w-8 h-8 text-blue-500 mb-3" />
                <p className="font-semibold text-white">{feature.name}</p>
                <p className="text-xs text-slate-400 mt-2">{feature.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Feature Interface */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">
            {features.find(f => f.id === selectedFeature)?.name}
          </CardTitle>
          <CardDescription className="text-slate-400">
            {features.find(f => f.id === selectedFeature)?.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-200">
              {selectedFeature === 'summary' && 'Select data to summarize'}
              {selectedFeature === 'email' && 'Email topic or content'}
              {selectedFeature === 'forecast' && 'Forecast parameters'}
              {selectedFeature === 'inventory' && 'Product or category'}
            </label>
            <div className="flex gap-2">
              <Input
                placeholder={selectedFeature === 'email' ? 'e.g., Project update to client' : 'Enter text...'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white"
              />
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Sample Output */}
          <div className="bg-slate-800 rounded-lg p-4 mt-4">
            <p className="text-sm text-slate-300">
              {selectedFeature === 'summary' && '💡 Summary: Your revenue has increased by 15% this month with strong performance in Q1...'}
              {selectedFeature === 'email' && '📧 Sample: Dear Client, I wanted to provide you with an update on the project progress...'}
              {selectedFeature === 'forecast' && '📈 Forecast: Based on current trends, sales are expected to grow by 20% next quarter...'}
              {selectedFeature === 'inventory' && '📦 Prediction: Inventory levels suggest reordering within 2 weeks to avoid stockouts...'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
