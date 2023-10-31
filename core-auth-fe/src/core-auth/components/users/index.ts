import GroupsIconOutlined from '@mui/icons-material/GroupsOutlined'
import { UserTable } from './list'
import { UserShow } from './show'

export class Users {
  static Name = 'User'
  static Icon = GroupsIconOutlined
  static Identifier = (record: any) => `${record.name}`
  static List = UserTable
  static Show = UserShow
  // static Edit = UserEdit
}
