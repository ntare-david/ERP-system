interface Column {
  key: string
  label: string
}

interface DataTableProps {
  columns: Column[]
  data: any[]
  onEdit?: (item: any) => void
  onDelete?: (item: any) => void
}

export function DataTable({ columns, data, onEdit, onDelete }: DataTableProps) {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-slate-800">
          {columns.map((col) => (
            <th key={col.key} className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx} className="border-b border-slate-800 hover:bg-slate-800">
            {columns.map((col) => (
              <td key={col.key} className="py-3 px-4 text-slate-200">
                {row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
