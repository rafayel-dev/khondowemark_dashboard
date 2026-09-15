export type User = {
  id: string
  name: string
  avatar?: string
  email: string
  phone: string
  joinedOn: string
  status: 'Active' | 'Blocked'
}

export const users: User[] = [
  { id: '1', name: 'Michael Smith', email: 'sakib.cse@gmail.com', phone: '+1 650-555-0832', joinedOn: 'Jul 16, 2025', status: 'Blocked' },
  { id: '2', name: 'Linda Perez', email: 'sajid.bd@gmail.com', phone: '+1 646-555-0678', joinedOn: 'Jul 14, 2025', status: 'Active' },
  { id: '3', name: 'John Miller', email: 'asif.cmt@gmail.com', phone: '+1 214-555-0985', joinedOn: 'Jul 20, 2025', status: 'Active' },
  { id: '4', name: 'Michael Smith', email: 'mamun.dev@gmail.com', phone: '+1 206-555-0734', joinedOn: 'Jul 20, 2025', status: 'Active' },
  { id: '5', name: 'Emily Carter', email: 'saifuddin.ui@gmail.com', phone: '+1 720-555-0641', joinedOn: 'Jul 12, 2025', status: 'Active' },
  { id: '6', name: 'David Johnson', email: 'rakib.js@gmail.com', phone: '+1 305-555-0219', joinedOn: 'Jul 10, 2025', status: 'Active' },
  { id: '7', name: 'Sophia White', email: 'asif.cmt@gmail.com', phone: '+1 215-555-0773', joinedOn: 'Jul 18, 2025', status: 'Blocked' },
  { id: '8', name: 'Chris Anderson', email: 'chris.a@gmail.com', phone: '+1 469-555-0456', joinedOn: 'Jul 08, 2025', status: 'Active' },
  { id: '9', name: 'Rachel Green', email: 'rachel.g@gmail.com', phone: '+1 512-555-0398', joinedOn: 'Jul 05, 2025', status: 'Active' },
  { id: '10', name: 'Daniel Kim', email: 'daniel.kim@gmail.com', phone: '+1 917-555-0271', joinedOn: 'Jul 02, 2025', status: 'Blocked' },
]
