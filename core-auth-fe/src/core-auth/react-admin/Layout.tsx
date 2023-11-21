import { LayoutProps } from 'react-admin'
import { GroovestackLayout } from '@groovestack/config'

import { Users } from '../resource/users'

export const Layout = (props: LayoutProps) => {
  return <GroovestackLayout LayoutProps={props} AppBarProps={{userMenu: <Users.Menu />}} />
}