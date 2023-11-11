import { Layout } from 'react-admin'
import React from 'react'
import { CustomAppBar } from './CustomAppBar'

export const CustomLayout = (props: any) => (
  <Layout {...props} appBar={CustomAppBar} />
)
