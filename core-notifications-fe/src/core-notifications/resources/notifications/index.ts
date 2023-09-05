import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import { NotificationTable } from './TableList'
import { NotificationShow } from './show'
import { ListGuesser, ShowGuesser } from 'react-admin';
import { NotificationEdit } from './edit';

export class Notifications {
  static Name = 'Notification'
  static Icon = NotificationsActiveOutlinedIcon
  static List = NotificationTable
  static Show = ShowGuesser // NotificationShow
  static Edit = NotificationEdit // NotificationShow
}
