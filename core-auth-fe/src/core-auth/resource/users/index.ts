import GroupsIconOutlined from '@mui/icons-material/GroupsOutlined'
import { UserTable } from './list'
import { UserShow, UserTabs, UserTabsConfig, AdminTab, PreferencesTab, PreferencesSettingsConfig, GeneralSettings } from './show'
import { UserMenu } from '../../components/UserMenu'

export class Users {
  static Name = 'User'
  static Icon = GroupsIconOutlined
  static Identifier = (record: any) => `${record.name}`
  static List = UserTable
  static Show = UserShow
  static Menu = UserMenu

  // child components for custom composition
  static ShowTabs = UserTabs
  static ShowTabsConfig = UserTabsConfig
  static ShowAdminTab = AdminTab
  static ShowPreferencesTab = PreferencesTab
  static ShowPreferencesSettingsConfig = PreferencesSettingsConfig
  static ShowGeneralSettings = GeneralSettings
}
