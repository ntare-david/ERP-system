import { Palette, Grid, Plus, Eye, Code } from 'lucide-react'

export default function WebsiteBuilder() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Website Builder</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <Grid size={20} className="text-blue-600" />
            <h2 className="font-semibold text-slate-900 dark:text-white">Templates Gallery</h2>
          </div>
          <div className="space-y-2">
            {['Landing Page', 'Product Showcase', 'Contact Form', 'Blog'].map((template) => (
              <button
                key={template}
                className="w-full px-3 py-2 text-left text-sm rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                {template}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 card">
          <h2 className="font-semibold text-slate-900 dark:text-white mb-4">Drag & Drop Editor</h2>
          <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-8 text-center">
            <Palette size={32} className="mx-auto text-slate-400 mb-3" />
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Drag components here to build your website
            </p>
            <div className="flex gap-2 justify-center flex-wrap">
              <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
                <Plus size={16} /> Add Component
              </button>
              <button className="px-3 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg text-sm hover:bg-slate-300 flex items-center gap-2">
                <Eye size={16} /> Preview
              </button>
              <button className="px-3 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg text-sm hover:bg-slate-300 flex items-center gap-2">
                <Code size={16} /> Code
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
