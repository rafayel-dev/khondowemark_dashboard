import type { ReactNode } from 'react'

export type Column<T> = {
  header: string
  width?: string
  render: (row: T, index: number) => ReactNode
}

export function DataTable<T>({
  columns,
  data,
  keyField,
}: {
  columns: Column<T>[]
  data: T[]
  keyField: (row: T) => string
}) {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-border">
      <table className="w-full min-w-max border-collapse">
        <thead className="bg-brand-soft">
          <tr>
            {columns.map((column) => (
              <th
                key={column.header}
                style={{ width: column.width }}
                className="border-r border-border/60 px-4 py-4 text-left text-[15px] font-semibold text-text last:border-r-0"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={keyField(row)} className="border-b-[0.5px] border-border last:border-b-0">
              {columns.map((column) => (
                <td key={column.header} className="px-4 py-4 text-sm text-text-soft">
                  {column.render(row, index)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && <p className="p-8 text-center text-sm text-text-soft">No records found.</p>}
    </div>
  )
}
