import { useMemo, useState } from 'react'

export function usePaginatedList<T>(data: T[], matches: (row: T, query: string) => boolean, pageSize = 6) {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => (search ? data.filter((row) => matches(row, search)) : data), [data, search, matches])
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize)

  function updateSearch(value: string) {
    setSearch(value)
    setPage(1)
  }

  return { search, setSearch: updateSearch, page, setPage, totalPages, pageData }
}
