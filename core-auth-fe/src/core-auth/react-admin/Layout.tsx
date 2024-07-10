import { GroovestackLayout } from '@groovestack/config'
import { LayoutProps } from 'react-admin'

import { Users } from '../resource/users'

export const Layout = (props: LayoutProps) => {
  const { appBar, ...rest } = props
  return (
    <GroovestackLayout
      LayoutProps={rest}
      AppBarProps={{ userMenu: <Users.Menu /> }}
    />
  )
}
