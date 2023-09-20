import { useRecordContext } from 'react-admin'
import { AdminTable } from './AdminTable'
import { UserList } from './UserList'

export const NotificationList = () => {
  const to = useRecordContext()

  if (to) return <UserList />
  else return <AdminTable />
}
