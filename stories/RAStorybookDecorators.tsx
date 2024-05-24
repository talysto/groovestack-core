// TODO: Keep this line import * as React from "react";
import React from 'react'
const R_KEEPER = React

import {
  Admin,
  AdminContext,
  Edit,
  Layout,
  Resource,
  SimpleForm,
  defaultI18nProvider,
  testDataProvider,
} from 'react-admin'

import fakeRestProvider from 'ra-data-fakerest'

const delayedPromise =
  (data, delay = 1000) =>
  () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(data), delay)
    })

export const withFormContext = (Story, context) => {
  return (
    <AdminContext
      i18nProvider={defaultI18nProvider}
      dataProvider={{
        ...testDataProvider(),
        getCompletion: delayedPromise({
          data: ' dolor sit amet',
        }),
      }}
    >
      <SimpleForm
        sx={{ minWidth: 240 }}
        record={{
          id: 1,
          name: 'Name',
          amount: '123.45',
          rating: 3,
          options: ['SM', 'MD', 'LG'],
          qty: 5,
          qty2: 2,
          created_at: Date.now(),
        }}
        onChange={(values) =>
          console.log('SimpleForm onChange:', JSON.stringify(values, null, 2))
        }
      >
        <Story {...context} />
      </SimpleForm>
    </AdminContext>
  )
}

export const withReactAdminContext = (Story, context) => {
  return (
    <AdminContext
      i18nProvider={defaultI18nProvider}
      dataProvider={{
        ...testDataProvider(),
        getCompletion: delayedPromise({
          data: ' dolor sit amet',
        }),
      }}
    >
      <Story {...context} />
    </AdminContext>
  )
}
const dataProvider = () =>
  fakeRestProvider({
    test: [
      {
        id: 7,
        name: 'Name',
        amount: '123.45',
        rating: 3,
        options: ['SM', 'MD', 'LG'],
        size: 'sm',
        qty: 5,
        qty2: 2,
        status:'Archived',
        status_events: [ {
          name: 'Archive',
          key: 'archive',
          enabled: status != 'archived',
        },
        {
          name: 'Publish',
          key: 'publish',
          enabled: status != 'active',
        },
        {
          name: 'Disable/Hide',
          key: 'draft',
          enabled: status != 'draft',
        },
      ],
        created_at: Date.now(),
        updated_at: Date.now(),
      },
    ],
  })

const EditWrapper = ({ children }) => (
  <Edit resource="test" id={7} mutationMode="optimistic">
    <SimpleForm>{children}</SimpleForm>
  </Edit>
)

const TimestampList = () => (
  <EditWrapper>
    <Story {...context} />
  </EditWrapper>
)

const MyAppBar = () => (
  <></>
  // <AppBar color="primary" position="static" sx={{ display: 'none' }} />
)

const MyMenu = () => (
  <></>
  // <Menu sx={{ display: 'none', position: 'static', height: '0px' }} />
)

const MyLayout = (props) => (
  <Layout
    {...props}
    menu={MyMenu}
    appBar={MyAppBar}
    sx={{
      mt: 0,
      minHeight: '25vh',
      backgroundColor: '#fff',
      width: '100%',
      '& .RaLayout-appFrame': {
        marginTop: '0px',
      },
      // '& .RaSidebar-root': { display: 'none', minHeight: '25vh', height: '25vh' },
      '& .RaSidebar-docked': {
        display: 'none',
        // minHeight: '25vh',
        // height: '25vh',
      },
    }}
  />
)

export const withEditFormContext = (Story, context) => {
  return (
    <Admin dataProvider={dataProvider()} layout={MyLayout}>
      <Resource
        navbar={false}
        name="test"
        list={
          <EditWrapper>
            <Story {...context} />
          </EditWrapper>
        }
        edit={EditWrapper}
        sx={{ height: '100px' }}
      />
    </Admin>
  )
}
