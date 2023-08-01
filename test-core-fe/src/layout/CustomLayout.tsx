// in src/CustomLayout.js
import { Layout, LayoutProps } from 'react-admin'

import { CustomAppBar } from './CustomAppBar'
import { JSX } from 'react/jsx-runtime'

export const CustomLayout = (props: JSX.IntrinsicAttributes & LayoutProps) => (
  <Layout {...props} appBar={CustomAppBar} />
)
