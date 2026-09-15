export type Notification = {
  id: string
  title: string
  message: string
  time: string
  read: boolean
}

export const notifications: Notification[] = [
  { id: '1', title: 'New User Registered', message: 'A new User account has been created successfully.', time: '04:45 PM', read: false },
  { id: '2', title: 'New Provider Registered', message: 'A new provider account has been created successfully.', time: '04:35 PM', read: false },
  { id: '3', title: 'New Dispute Opened', message: 'A new dispute has been submitted and requires review.', time: '04:25 PM', read: true },
  { id: '4', title: 'New Provider Verification', message: 'A provider verification request is waiting for admin review.', time: '04:15 PM', read: true },
]
