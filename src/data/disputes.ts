export type DisputeStatus = 'In Review' | 'Response Required' | 'Resolved'
export type ProviderResponseState = 'none' | 'waiting' | 'responded'
export type ResolutionType = 'Full Refund' | 'Partial Refund' | 'No Refund'

export type DisputePerson = { name: string; email: string; phone: string; since: string; active: boolean }

export type DisputeProviderResponse = {
  respondedOn: string
  evidence: string[]
  message: string
}

export type DisputeResolution = {
  actionedOn: string
  type: ResolutionType
  refundTo?: 'User' | 'Provider'
  userRefundAmount?: string
  providerPayoutAmount?: string
  userNote: string
  providerNote: string
}

export type Dispute = {
  id: string
  userId: string
  providerId: string
  customer: DisputePerson
  provider: DisputePerson
  category: string
  serviceStatus: string
  date: string
  serviceArea: string
  amount: string
  paymentMethod: string
  details: string
  status: DisputeStatus
  issueType: string
  customerMessage: string
  evidence: string[]
  providerResponseState: ProviderResponseState
  providerResponse?: DisputeProviderResponse
  resolution?: DisputeResolution
}

export const disputeStatusVariant: Record<DisputeStatus, 'warning' | 'error' | 'success'> = {
  'In Review': 'warning',
  'Response Required': 'error',
  Resolved: 'success',
}

export const disputes: Dispute[] = [
  {
    id: '1',
    userId: '1',
    providerId: '1',
    customer: { name: 'Maximilian Becker', email: 'max.becker@gmail.com', phone: '+1 214-555-0985', since: 'Jul 20, 2025', active: true },
    provider: { name: 'Hannah Wagner', email: 'hannah.w@gmail.com', phone: '+1 650-555-0832', since: 'Jul 16, 2025', active: true },
    category: 'Electrical',
    serviceStatus: 'Completed',
    date: 'Aug 30 • 10:00 AM',
    serviceArea: 'Lusaka, Zambia',
    amount: 'ZMW 367.50',
    paymentMethod: 'Airtel Money',
    details: 'Customer requested a full rewiring check for the living room and kitchen circuits.',
    status: 'Response Required',
    issueType: 'Service Issue',
    customerMessage: 'The service was not completed as expected. I would like the issue to be reviewed.',
    evidence: ['evidence-1.jpg', 'evidence-2.jpg'],
    providerResponseState: 'none',
  },
  {
    id: '2',
    userId: '2',
    providerId: '2',
    customer: { name: 'Noah Hoffmann', email: 'noah.h@gmail.com', phone: '+1 646-555-0678', since: 'Jul 14, 2025', active: true },
    provider: { name: 'Clara Vogel', email: 'clara.v@gmail.com', phone: '+1 720-555-0641', since: 'Jul 12, 2025', active: true },
    category: 'Plumbing',
    serviceStatus: 'Completed',
    date: 'Sep 4 • 10:00 AM',
    serviceArea: 'Ndola, Zambia',
    amount: 'ZMW 220.00',
    paymentMethod: 'MTN Money',
    details: 'Kitchen sink leak repair with follow-up pipe inspection.',
    status: 'In Review',
    issueType: 'Billing Issue',
    customerMessage: 'I was charged more than the price I was quoted before the job started.',
    evidence: ['evidence-1.jpg'],
    providerResponseState: 'responded',
    providerResponse: {
      respondedOn: 'Sep 5 • 9:20 AM',
      evidence: ['response-1.jpg'],
      message: 'The additional charge covered a replacement part that was not part of the original quote. Receipt attached.',
    },
  },
  {
    id: '3',
    userId: '3',
    providerId: '3',
    customer: { name: 'Lena Fischer', email: 'lena.f@gmail.com', phone: '+1 305-555-0219', since: 'Jul 10, 2025', active: true },
    provider: { name: 'Felix Braun', email: 'felix.b@gmail.com', phone: '+1 469-555-0456', since: 'Jul 08, 2025', active: false },
    category: 'Cleaning',
    serviceStatus: 'Completed',
    date: 'Sep 5 • 2:00 PM',
    serviceArea: 'Kitwe, Zambia',
    amount: 'ZMW 160.00',
    paymentMethod: 'Zamtel Money',
    details: 'Deep cleaning for a 2-bedroom apartment ahead of a move-out inspection.',
    status: 'Resolved',
    issueType: 'No Show',
    customerMessage: 'Provider did not show up at the scheduled time. Refund was issued.',
    evidence: ['evidence-1.jpg'],
    providerResponseState: 'responded',
    providerResponse: {
      respondedOn: 'Sep 6 • 11:05 AM',
      evidence: ['response-1.jpg'],
      message: 'There was a scheduling conflict on my end. I apologize for the inconvenience and agree to a full refund.',
    },
    resolution: {
      actionedOn: 'Sep 6 • 3:40 PM',
      type: 'Full Refund',
      refundTo: 'User',
      userNote: 'Full refund issued to the customer for the missed appointment.',
      providerNote: 'Please ensure scheduling conflicts are reported in advance going forward.',
    },
  },
]
