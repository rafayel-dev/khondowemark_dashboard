export type BookingStatus = 'Pending' | 'Accepted' | 'In Progress' | 'Completed' | 'Cancelled' | 'Rejected' | 'Disputed'

export type BookingPerson = { name: string; email: string; phone: string; since: string; active: boolean }

export type Booking = {
  id: string
  customerId: string
  providerId: string
  customer: BookingPerson
  provider: BookingPerson
  service: string
  schedule: string
  amount: string
  status: BookingStatus
  serviceArea: string
  details: string
  payment: {
    totalPaid: string
    platformFee: string
    paymentOn: string
    providerReceives: string
  }
}

export const bookingStatusVariant: Record<BookingStatus, 'warning' | 'info' | 'purple' | 'success' | 'neutral' | 'error'> = {
  Pending: 'warning',
  Accepted: 'info',
  'In Progress': 'purple',
  Completed: 'success',
  Cancelled: 'neutral',
  Rejected: 'error',
  Disputed: 'error',
}

export const bookings: Booking[] = [
  {
    id: '1',
    customerId: '3',
    providerId: '4',
    customer: { name: 'John Miller', email: 'asif.cmt@gmail.com', phone: '+1 214-555-0985', since: 'Jul 20, 2025', active: true },
    provider: { name: 'Michael Smith', email: 'sakib.cse@gmail.com', phone: '+1 650-555-0832', since: 'Jul 16, 2025', active: true },
    service: 'Electrical',
    schedule: 'Aug 30 • 10:00 AM',
    amount: 'ZMW 350',
    status: 'Accepted',
    serviceArea: 'Lusaka, Zambia',
    details: 'Join us for an evening of networking, live music, and curated drinks. Connect with professionals, entrepreneurs, and creatives in a relaxed rooftop setting.',
    payment: { totalPaid: 'ZMW 367.50', platformFee: 'ZMW 17.50', paymentOn: 'Airtel Money', providerReceives: 'ZMW 350.00' },
  },
  {
    id: '2',
    customerId: '1',
    providerId: '1',
    customer: { name: 'Noah Hoffmann', email: 'noah.h@gmail.com', phone: '+1 646-555-0678', since: 'Jul 14, 2025', active: true },
    provider: { name: 'Clara Vogel', email: 'clara.v@gmail.com', phone: '+1 720-555-0641', since: 'Jul 12, 2025', active: true },
    service: 'Plumbing',
    schedule: 'Sep 4 • 10:00 AM',
    amount: 'ZMW 350',
    status: 'Pending',
    serviceArea: 'Ndola, Zambia',
    details: 'Kitchen sink is leaking under the cabinet and the shut-off valve needs to be replaced as well.',
    payment: { totalPaid: 'ZMW 367.50', platformFee: 'ZMW 17.50', paymentOn: 'MTN Money', providerReceives: 'ZMW 350.00' },
  },
  {
    id: '3',
    customerId: '2',
    providerId: '2',
    customer: { name: 'Mia Krämer', email: 'mia.k@gmail.com', phone: '+1 305-555-0219', since: 'Jul 10, 2025', active: true },
    provider: { name: 'Mia Krämer', email: 'mia.provider@gmail.com', phone: '+1 469-555-0456', since: 'Jul 08, 2025', active: true },
    service: 'Gardening',
    schedule: 'Sep 7 • 10:00 AM',
    amount: 'ZMW 350',
    status: 'Accepted',
    serviceArea: 'Kitwe, Zambia',
    details: 'Front yard hedges need trimming and the flower beds should be weeded before the weekend.',
    payment: { totalPaid: 'ZMW 367.50', platformFee: 'ZMW 17.50', paymentOn: 'Zamtel Money', providerReceives: 'ZMW 350.00' },
  },
  {
    id: '4',
    customerId: '4',
    providerId: '3',
    customer: { name: 'Noah Hoffmann', email: 'noah.h2@gmail.com', phone: '+1 512-555-0398', since: 'Jul 05, 2025', active: true },
    provider: { name: 'Finn Richter', email: 'finn.r@gmail.com', phone: '+1 917-555-0271', since: 'Jul 02, 2025', active: true },
    service: 'Painting',
    schedule: 'Aug 26 • 10:00 AM',
    amount: 'ZMW 350',
    status: 'In Progress',
    serviceArea: 'Livingstone, Zambia',
    details: 'Living room walls need a fresh coat of paint, customer has already picked the color.',
    payment: { totalPaid: 'ZMW 367.50', platformFee: 'ZMW 17.50', paymentOn: 'Airtel Money', providerReceives: 'ZMW 350.00' },
  },
  {
    id: '5',
    customerId: '5',
    providerId: '5',
    customer: { name: 'Sophie Schneider', email: 'sophie.s@gmail.com', phone: '+1 214-555-0111', since: 'Jul 18, 2025', active: true },
    provider: { name: 'Emma Braun', email: 'emma.b@gmail.com', phone: '+1 646-555-0222', since: 'Jul 14, 2025', active: true },
    service: 'Moving',
    schedule: 'Aug 29 • 10:00 AM',
    amount: 'ZMW 350',
    status: 'Completed',
    serviceArea: 'Lusaka, Zambia',
    details: 'Two-bedroom apartment move across town, includes packing of fragile items.',
    payment: { totalPaid: 'ZMW 367.50', platformFee: 'ZMW 17.50', paymentOn: 'MTN Money', providerReceives: 'ZMW 350.00' },
  },
  {
    id: '6',
    customerId: '6',
    providerId: '6',
    customer: { name: 'Leon Schäfer', email: 'leon.s@gmail.com', phone: '+1 214-555-0333', since: 'Jul 20, 2025', active: true },
    provider: { name: 'Mia Krämer', email: 'mia.k2@gmail.com', phone: '+1 206-555-0444', since: 'Jul 20, 2025', active: true },
    service: 'Personal Care',
    schedule: 'Sep 9 • 10:00 AM',
    amount: 'ZMW 350',
    status: 'Completed',
    serviceArea: 'Ndola, Zambia',
    details: 'Home haircut and grooming session requested for an elderly customer.',
    payment: { totalPaid: 'ZMW 367.50', platformFee: 'ZMW 17.50', paymentOn: 'Zamtel Money', providerReceives: 'ZMW 350.00' },
  },
  {
    id: '7',
    customerId: '7',
    providerId: '7',
    customer: { name: 'Emma Braun', email: 'emma.b2@gmail.com', phone: '+1 720-555-0555', since: 'Jul 12, 2025', active: true },
    provider: { name: 'Maximilian Becker', email: 'max.b@gmail.com', phone: '+1 305-555-0666', since: 'Jul 10, 2025', active: false },
    service: 'Electrical',
    schedule: 'Sep 5 • 10:00 AM',
    amount: 'ZMW 350',
    status: 'Cancelled',
    serviceArea: 'Kitwe, Zambia',
    details: 'Customer cancelled the booking before the provider arrived on site.',
    payment: { totalPaid: 'ZMW 0.00', platformFee: 'ZMW 0.00', paymentOn: 'Airtel Money', providerReceives: 'ZMW 0.00' },
  },
  {
    id: '8',
    customerId: '8',
    providerId: '8',
    customer: { name: 'Hannah Wagner', email: 'hannah.w@gmail.com', phone: '+1 215-555-0777', since: 'Jul 18, 2025', active: true },
    provider: { name: 'Lena Fischer', email: 'lena.f@gmail.com', phone: '+1 469-555-0888', since: 'Jul 08, 2025', active: true },
    service: 'Appliance',
    schedule: 'Aug 24 • 10:00 AM',
    amount: 'ZMW 350',
    status: 'Rejected',
    serviceArea: 'Livingstone, Zambia',
    details: 'Provider was unable to source the replacement part required for the repair.',
    payment: { totalPaid: 'ZMW 0.00', platformFee: 'ZMW 0.00', paymentOn: 'MTN Money', providerReceives: 'ZMW 0.00' },
  },
  {
    id: '9',
    customerId: '9',
    providerId: '1',
    customer: { name: 'Alex Müller', email: 'alex.m@gmail.com', phone: '+1 650-555-0999', since: 'Jul 16, 2025', active: true },
    provider: { name: 'Mia Krämer', email: 'mia.k3@gmail.com', phone: '+1 646-555-0121', since: 'Jul 14, 2025', active: true },
    service: 'Pest Control',
    schedule: 'Aug 23 • 10:00 AM',
    amount: 'ZMW 350',
    status: 'Disputed',
    serviceArea: 'Lusaka, Zambia',
    details: 'Customer reports the pest issue was not resolved after the scheduled treatment.',
    payment: { totalPaid: 'ZMW 367.50', platformFee: 'ZMW 17.50', paymentOn: 'Zamtel Money', providerReceives: 'ZMW 350.00' },
  },
]
