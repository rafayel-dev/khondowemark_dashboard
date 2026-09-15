export type TicketStatus = 'To Do' | 'In Progress' | 'Resolved'
export type RequesterRole = 'User' | 'Provider'

export type SupportTicket = {
  id: string
  requesterId: string
  requester: { name: string; email: string; phone: string; since: string; active: boolean }
  requesterRole: RequesterRole
  reason: string
  status: TicketStatus
  submittedOn: string
  description: string
}

export const ticketStatusVariant: Record<TicketStatus, 'warning' | 'info' | 'success'> = {
  'To Do': 'warning',
  'In Progress': 'info',
  Resolved: 'success',
}

export const supportTickets: SupportTicket[] = [
  {
    id: '1',
    requesterId: '4',
    requester: { name: 'Michael Smith', email: 'michael.s@gmail.com', phone: '+1 206-555-0444', since: 'Jul 20, 2025', active: true },
    requesterRole: 'Provider',
    reason: 'Certification Assistance',
    status: 'To Do',
    submittedOn: 'Aug 30 • 10:00 AM',
    description:
      'I am reaching out regarding my provider account registration. My ID verification is currently failing or pending, and I am unable to start offering services. I would like to request an update on the status of my verification and understand what needs to be fixed. Please let me know if I need to re-upload my documents or provide any additional information. Thank you for your time and assistance.',
  },
  {
    id: '2',
    requesterId: '6',
    requester: { name: 'Linda Perez', email: 'linda.p@gmail.com', phone: '+1 305-555-0666', since: 'Jul 10, 2025', active: true },
    requesterRole: 'Provider',
    reason: 'Payment Not Received',
    status: 'In Progress',
    submittedOn: 'Sep 2 • 9:00 AM',
    description: 'A completed booking payout has not reflected in my earnings balance. Please review and confirm the payout status.',
  },
  {
    id: '3',
    requesterId: '3',
    requester: { name: 'John Miller', email: 'asif.cmt@gmail.com', phone: '+1 214-555-0985', since: 'Jul 20, 2025', active: true },
    requesterRole: 'User',
    reason: 'Account Access Issue',
    status: 'Resolved',
    submittedOn: 'Aug 28 • 4:00 PM',
    description: 'Was unable to log in after resetting my password. Issue was resolved after re-verifying the account email.',
  },
]
