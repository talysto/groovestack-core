import GroupsIconOutlined from '@mui/icons-material/GroupsOutlined'
import { UserTable } from './list'
import { UserShow } from './show'
import { UserMenu } from '../../components/UserMenu'

export class Users {
  static Name = 'User'
  static Icon = GroupsIconOutlined
  static Identifier = (record: any) => `${record.name}`
  static List = UserTable
  static Show = UserShow
  static Menu = UserMenu
}
