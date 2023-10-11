// in src/MyAppBar.js
import React from 'react'
import { AppBar, Logout, TitlePortal, UserMenu } from 'react-admin'

export const CustomAppBar = () => {
  return (
    <AppBar
      color="primary"
      userMenu={
        <UserMenu>
          {/* <SettingsMenuItem /> */}
          <Logout />
        </UserMenu>
      }
    >
      <TitlePortal />
    </AppBar>
  )
}