import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined'
import { ShowGuesser } from 'react-admin'
import { NotificationList } from './NotificationTable'
import { NotificationEdit } from './edit'

export class Notifications {
  static Name = 'Notification'
  static Icon = NotificationsActiveOutlinedIcon
  static List = NotificationList
  static Show = ShowGuesser // NotificationShow
  static Edit = NotificationEdit // NotificationShow
}
