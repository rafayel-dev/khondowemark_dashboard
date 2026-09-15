export type EarningStatus = 'Earned' | 'Refunded'

export type EarningEntry = {
  id: string
  dateTime: string
  method: string
  status: EarningStatus
  amount: string
}

export const earningsSummary = {
  total: 'ZMW 3657.50',
  change: '5%',
  trend: 'up' as const,
}

export const platformFee = {
  percentage: 5,
  lastUpdated: '08 September 2026',
}

export const PERIOD_OPTIONS = ['Today', 'Last 24 Hours', 'Last Week', 'Last Fortnight', 'Last Month', 'Last Year'] as const

export const earningsStatusVariant: Record<EarningStatus, 'success' | 'error'> = {
  Earned: 'success',
  Refunded: 'error',
}

export const earnings: EarningEntry[] = [
  { id: '01', dateTime: 'Sep 11 • 10:00 AM', method: 'Airtel Money', status: 'Earned', amount: 'ZMW 367.50' },
  { id: '02', dateTime: 'Aug 26 • 10:00 AM', method: 'Airtel Money', status: 'Earned', amount: 'ZMW 570.00' },
  { id: '03', dateTime: 'Aug 27 • 10:00 AM', method: 'MTN Money', status: 'Earned', amount: 'ZMW 160.00' },
  { id: '04', dateTime: 'Sep 9 • 10:00 AM', method: 'MTN Money', status: 'Earned', amount: 'ZMW 250.00' },
  { id: '05', dateTime: 'Sep 2 • 10:00 AM', method: 'Zamtel Money', status: 'Earned', amount: 'ZMW 340.00' },
  { id: '06', dateTime: 'Sep 3 • 10:00 AM', method: 'Zamtel Money', status: 'Earned', amount: 'ZMW 430.00' },
  { id: '07', dateTime: 'Aug 23 • 10:00 AM', method: 'Airtel Money', status: 'Refunded', amount: 'ZMW 520.00' },
  { id: '08', dateTime: 'Sep 8 • 10:00 AM', method: 'Zamtel Money', status: 'Refunded', amount: 'ZMW 610.00' },
]
