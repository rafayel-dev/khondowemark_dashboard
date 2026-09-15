import { Users as UsersIcon } from 'lucide-react'
import { PeopleListPage } from '@/components/patterns/PeopleListPage'
import { useAppData } from '@/hooks/useAppData'

export default function Users() {
  const { users, setUsers } = useAppData()
  return <PeopleListPage title="Users" icon={UsersIcon} basePath="/users" data={users} setData={setUsers} />
}
