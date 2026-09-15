# Nchito Admin Dashboard

Admin dashboard for the Nchito service marketplace, built from the Figma design.

## Stack

React 19 + TypeScript + Vite, Tailwind CSS v4, React Router, Lucide icons.

## Structure

```
src/
  components/
    layout/     # Sidebar, Topbar, AppLayout, AuthCard
    ui/         # Design-system primitives (Button, Badge, DataTable, ...)
    patterns/   # Composed page patterns reused across routes
  data/         # Typed mock data per domain
  hooks/        # Shared hooks (usePaginatedList)
  pages/        # One file per route
  lib/          # cn() utility
```

## Scripts

```bash
npm run dev      # start dev server
npm run build    # type-check + production build
npm run lint     # oxlint
npm run preview  # preview the production build
```

Data is currently mocked in `src/data/*` — swap those modules for API calls when the backend is ready; the page components are already decoupled from the data shape they consume via typed props.
