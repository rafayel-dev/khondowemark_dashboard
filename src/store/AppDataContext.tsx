import { useState } from 'react'
import { disputes as initialDisputes } from '@/data/disputes'
import { privacyDocument as initialPrivacyDocument, termsDocument as initialTermsDocument } from '@/data/legalDocuments'
import { providers as initialProviders } from '@/data/providers'
import { serviceCategories as initialServiceCategories } from '@/data/serviceCategories'
import { supportTickets as initialSupportTickets } from '@/data/supportTickets'
import { users as initialUsers } from '@/data/users'
import { verificationRequests as initialVerificationRequests } from '@/data/verification'
import { AppDataContext } from './app-data-context'

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState(initialUsers)
  const [providers, setProviders] = useState(initialProviders)
  const [serviceCategories, setServiceCategories] = useState(initialServiceCategories)
  const [verificationRequests, setVerificationRequests] = useState(initialVerificationRequests)
  const [disputes, setDisputes] = useState(initialDisputes)
  const [supportTickets, setSupportTickets] = useState(initialSupportTickets)
  const [termsDocument, setTermsDocument] = useState(initialTermsDocument)
  const [privacyDocument, setPrivacyDocument] = useState(initialPrivacyDocument)

  return (
    <AppDataContext.Provider
      value={{
        users,
        setUsers,
        providers,
        setProviders,
        serviceCategories,
        setServiceCategories,
        verificationRequests,
        setVerificationRequests,
        disputes,
        setDisputes,
        supportTickets,
        setSupportTickets,
        termsDocument,
        setTermsDocument,
        privacyDocument,
        setPrivacyDocument,
      }}
    >
      {children}
    </AppDataContext.Provider>
  )
}
