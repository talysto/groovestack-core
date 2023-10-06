import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined'
import { ShowGuesser } from 'react-admin'
import { AdminTable } from './AdminTable'
import { NotificationEdit } from './edit'
import { UserList } from './UserList'

export class Notifications {
  static Name = 'Notification'
  static Icon = NotificationsActiveOutlinedIcon
  
  static Edit = NotificationEdit // NotificationShow
  static List = AdminTable
  static Show = ShowGuesser // NotificationShow
  static UserList = UserList
}
