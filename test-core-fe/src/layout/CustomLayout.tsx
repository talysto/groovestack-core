// in src/CustomLayout.js
import { Layout, LayoutProps } from 'react-admin'

import { JSX } from 'react/jsx-runtime'
import { CustomAppBar } from './CustomAppBar'

export const CustomLayout = (props: JSX.IntrinsicAttributes & LayoutProps) => (
  <Layout {...props} appBar={CustomAppBar} />
)
