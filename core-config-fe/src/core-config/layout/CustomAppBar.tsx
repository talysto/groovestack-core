import { AppBar, TitlePortal, Layout } from 'react-admin'
import { Auth } from '@moonlight-labs/core-auth-fe'
import React from 'react'

export const CustomAppBar = (props: any) => {
  return (
    <AppBar
      color="primary"
      userMenu={
        <Auth.Users.Menu {...props} />
      }
    >
      <TitlePortal />
    </AppBar>
  )
}
