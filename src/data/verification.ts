export type VerificationStatus = 'Pending' | 'Verified' | 'Rejected'

export type VerificationProvider = { name: string; email: string; phone: string; since: string; active: boolean }

export type VerificationRequest = {
  id: string
  providerId: string
  name: string
  type: string
  requestedOn: string
  status: VerificationStatus
  provider: VerificationProvider
}

export const verificationStatusVariant: Record<VerificationStatus, 'warning' | 'success' | 'error'> = {
  Pending: 'warning',
  Verified: 'success',
  Rejected: 'error',
}

export const verificationRequests: VerificationRequest[] = [
  {
    id: '1',
    providerId: '1',
    name: 'Ayesha Rahman',
    type: 'National Registration Card (NRC)',
    requestedOn: '21 August 2026',
    status: 'Pending',
    provider: { name: 'Ayesha Rahman', email: 'ayesha.r@gmail.com', phone: '+1 650-555-0111', since: 'Jul 16, 2025', active: true },
  },
  {
    id: '2',
    providerId: '6',
    name: 'Linda Perez',
    type: 'Passport',
    requestedOn: '18 August 2026',
    status: 'Pending',
    provider: { name: 'Linda Perez', email: 'linda.p@gmail.com', phone: '+1 305-555-0666', since: 'Jul 14, 2025', active: true },
  },
  {
    id: '3',
    providerId: '2',
    name: 'James Anderson',
    type: 'Driver’s License',
    requestedOn: '20 July 2026',
    status: 'Verified',
    provider: { name: 'James Anderson', email: 'james.a@gmail.com', phone: '+1 646-555-0222', since: 'Jul 20, 2025', active: true },
  },
  {
    id: '4',
    providerId: '3',
    name: 'Karen Thompson',
    type: 'National Registration Card (NRC)',
    requestedOn: '18 July 2026',
    status: 'Rejected',
    provider: { name: 'Karen Thompson', email: 'karen.t@gmail.com', phone: '+1 214-555-0333', since: 'Jul 20, 2025', active: false },
  },
  {
    id: '5',
    providerId: '7',
    name: 'John Miller',
    type: 'Passport',
    requestedOn: '12 July 2026',
    status: 'Verified',
    provider: { name: 'John Miller', email: 'john.m@gmail.com', phone: '+1 215-555-0777', since: 'Jul 18, 2025', active: true },
  },
  {
    id: '6',
    providerId: '8',
    name: 'Sophia White',
    type: 'National Registration Card (NRC)',
    requestedOn: '08 July 2026',
    status: 'Pending',
    provider: { name: 'Sophia White', email: 'sophia.w@gmail.com', phone: '+1 469-555-0888', since: 'Jul 08, 2025', active: true },
  },
]
