// in src/CustomLayout.js
import { Layout } from 'react-admin'

import { CustomAppBar } from './CustomAppBar'

export const CustomLayout = (props) => (
  <Layout {...props} appBar={CustomAppBar} />
)
