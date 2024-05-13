// TODO: Keep this line import * as React from "react";
import React from 'react'
const R_KEEPER = React

import {
  AdminContext,
  SimpleForm,
  defaultI18nProvider,
  testDataProvider,
} from 'react-admin'

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
