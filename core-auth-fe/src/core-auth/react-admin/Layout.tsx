import { GroovestackLayout } from '@groovestack/config'
import { LayoutProps as ReactAdminLayoutProps } from 'react-admin'

import { Users } from '../resource/users'

export const Layout = (props: ReactAdminLayoutProps) => {
  return (
    <GroovestackLayout
      layoutProps={props}
      AppBarProps={{ userMenu: <Users.Menu /> }}
    />
  )
}
