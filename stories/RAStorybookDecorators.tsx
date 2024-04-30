import * as React from "react";

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
        record={{ name: 'Name', amount: '25.43', created_at: Date.now() }}
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
