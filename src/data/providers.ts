import type { User } from './users'

export type VerificationStatus = 'Pending' | 'Verified' | 'Rejected'

export type ProviderService = {
  id: string
  name: string
  price: string
  duration: string
  serviceArea: string
  completedJobs: number
  rating: number
}

export type Provider = User & {
  verification: {
    idType: string
    submittedOn: string
    status: VerificationStatus
  }
  services: ProviderService[]
}

export const providers: Provider[] = [
  {
    id: '1',
    name: 'Ayesha Rahman',
    email: 'ayesha.r@gmail.com',
    phone: '+1 650-555-0111',
    joinedOn: 'Jul 16, 2025',
    status: 'Active',
    verification: { idType: 'National ID Card', submittedOn: '21 August 2026', status: 'Verified' },
    services: [
      { id: '1', name: 'Moving', price: 'ZMW 350.00', duration: '90 minutes', serviceArea: 'Lusaka, Zambia', completedJobs: 24, rating: 4.8 },
      { id: '2', name: 'Cleaning', price: 'ZMW 350.00', duration: '90 minutes', serviceArea: 'Lusaka, Zambia', completedJobs: 19, rating: 4.6 },
      { id: '3', name: 'Electrical', price: 'ZMW 350.00', duration: '90 minutes', serviceArea: 'Lusaka, Zambia', completedJobs: 24, rating: 4.8 },
    ],
  },
  {
    id: '2',
    name: 'James Anderson',
    email: 'james.a@gmail.com',
    phone: '+1 646-555-0222',
    joinedOn: 'Jul 14, 2025',
    status: 'Active',
    verification: { idType: 'National ID Card', submittedOn: '18 August 2026', status: 'Pending' },
    services: [],
  },
  {
    id: '3',
    name: 'Karen Thompson',
    email: 'karen.t@gmail.com',
    phone: '+1 214-555-0333',
    joinedOn: 'Jul 20, 2025',
    status: 'Blocked',
    verification: { idType: 'National ID Card', submittedOn: '21 August 2026', status: 'Verified' },
    services: [],
  },
  {
    id: '4',
    name: 'Michael Smith',
    email: 'michael.s@gmail.com',
    phone: '+1 206-555-0444',
    joinedOn: 'Jul 20, 2025',
    status: 'Active',
    verification: { idType: 'Passport', submittedOn: '21 August 2026', status: 'Rejected' },
    services: [],
  },
  {
    id: '5',
    name: 'Emily Carter',
    email: 'emily.c@gmail.com',
    phone: '+1 720-555-0555',
    joinedOn: 'Jul 12, 2025',
    status: 'Active',
    verification: { idType: 'National ID Card', submittedOn: '15 August 2026', status: 'Verified' },
    services: [{ id: '1', name: 'Personal Care', price: 'ZMW 220.00', duration: '60 minutes', serviceArea: 'Ndola, Zambia', completedJobs: 11, rating: 4.5 }],
  },
  {
    id: '6',
    name: 'Linda Perez',
    email: 'linda.p@gmail.com',
    phone: '+1 305-555-0666',
    joinedOn: 'Jul 10, 2025',
    status: 'Active',
    verification: { idType: 'National ID Card', submittedOn: '12 August 2026', status: 'Verified' },
    services: [{ id: '1', name: 'Painting', price: 'ZMW 300.00', duration: '120 minutes', serviceArea: 'Kitwe, Zambia', completedJobs: 8, rating: 4.3 }],
  },
  {
    id: '7',
    name: 'John Miller',
    email: 'john.m@gmail.com',
    phone: '+1 215-555-0777',
    joinedOn: 'Jul 18, 2025',
    status: 'Blocked',
    verification: { idType: 'Passport', submittedOn: '10 August 2026', status: 'Pending' },
    services: [],
  },
  {
    id: '8',
    name: 'Sophia White',
    email: 'sophia.w@gmail.com',
    phone: '+1 469-555-0888',
    joinedOn: 'Jul 08, 2025',
    status: 'Active',
    verification: { idType: 'National ID Card', submittedOn: '08 August 2026', status: 'Verified' },
    services: [{ id: '1', name: 'Gardening', price: 'ZMW 180.00', duration: '90 minutes', serviceArea: 'Livingstone, Zambia', completedJobs: 15, rating: 4.7 }],
  },
]
