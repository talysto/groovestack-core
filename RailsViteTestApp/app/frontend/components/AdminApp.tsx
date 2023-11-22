import React from 'react'
import { Admin, Resource } from 'react-admin'
import { Auth } from '@groovestack/auth'
import { GroovestackDash } from '@groovestack/config'
import { Jobs } from '@groovestack/jobs'
import { useAppInit } from './useAppInit'

const AdminResources = [
  <Resource
    name={Auth.Users.Name}
    icon={Auth.Users.Icon}
    list={Auth.Users.List}
    show={Auth.Users.Show}
    recordRepresentation={Auth.Users.Identifier}
  />,
  <Resource
    name='Job'
    icon={Jobs.Icon}
    edit={Jobs.Edit}
    list={Jobs.List}
    recordRepresentation={Jobs.resourceRepresentation}
  />,
  <Resource name='Identity' />
]

const NonAdminResources = [
  <Resource
    name={Auth.Users.Name}
    icon={Auth.Users.Icon}
    show={Auth.Users.Show}
    recordRepresentation={Auth.Users.Identifier}
  />,
  <Resource name='Identity' />
]

export const AdminApp = () => {
  const { loading: appLoading, authProvider, dataProvider } = useAppInit()

  if (appLoading) return <div>Loading...</div>

  const renderResources = async (permissions: string[]) => permissions.includes('admin') ? AdminResources : NonAdminResources
  
  return (
    <Admin
      loginPage={Auth.RA.LoginPage}
      disableTelemetry
      authProvider={authProvider}
      dataProvider={dataProvider}
      dashboard={GroovestackDash}
      layout={Auth.RA.Layout}
      requireAuth
    >
      {renderResources}
    </Admin>
)}