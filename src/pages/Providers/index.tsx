import { PeopleListPage } from '@/components/patterns/PeopleListPage'
import { useAppData } from '@/hooks/useAppData'

export default function Providers() {
  const { providers, setProviders } = useAppData()
  return <PeopleListPage title="Providers" basePath="/providers" data={providers} setData={setProviders} />
}
