import { Search } from 'lucide-react'
import { FilterDropdown } from './FilterDropdown'

export function ListToolbar<T extends string>({
  search,
  onSearchChange,
  searchPlaceholder = 'Search by name',
  filterLabel,
  filterValue,
  filterOptions,
  onFilterChange,
}: {
  search: string
  onSearchChange: (value: string) => void
  searchPlaceholder?: string
  filterLabel?: string
  filterValue?: T
  filterOptions?: readonly T[]
  onFilterChange?: (value: T) => void
}) {
  return (
    <div className="flex items-center gap-5">
      <div className="flex h-10 w-[280px] items-center gap-2.5 rounded-lg bg-black/[0.04] px-4">
        <Search size={16} className="shrink-0 text-text-soft" />
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full bg-transparent text-sm text-text placeholder:text-text-soft focus:outline-none"
        />
      </div>

      {filterLabel && filterOptions && filterValue && onFilterChange && (
        <FilterDropdown label={filterLabel} value={filterValue} options={filterOptions} onChange={onFilterChange} />
      )}
    </div>
  )
}
