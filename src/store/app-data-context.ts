import { createContext } from 'react'
import type { Dispute } from '@/data/disputes'
import type { LegalDocument } from '@/data/legalDocuments'
import type { Provider } from '@/data/providers'
import type { ServiceCategory } from '@/data/serviceCategories'
import type { SupportTicket } from '@/data/supportTickets'
import type { User } from '@/data/users'
import type { VerificationRequest } from '@/data/verification'

export type AppDataValue = {
  users: User[]
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
  providers: Provider[]
  setProviders: React.Dispatch<React.SetStateAction<Provider[]>>
  serviceCategories: ServiceCategory[]
  setServiceCategories: React.Dispatch<React.SetStateAction<ServiceCategory[]>>
  verificationRequests: VerificationRequest[]
  setVerificationRequests: React.Dispatch<React.SetStateAction<VerificationRequest[]>>
  disputes: Dispute[]
  setDisputes: React.Dispatch<React.SetStateAction<Dispute[]>>
  supportTickets: SupportTicket[]
  setSupportTickets: React.Dispatch<React.SetStateAction<SupportTicket[]>>
  termsDocument: LegalDocument
  setTermsDocument: React.Dispatch<React.SetStateAction<LegalDocument>>
  privacyDocument: LegalDocument
  setPrivacyDocument: React.Dispatch<React.SetStateAction<LegalDocument>>
}

export const AppDataContext = createContext<AppDataValue | null>(null)
