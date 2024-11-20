import { SimpleForm, TextInput } from 'react-admin'

import { MoneyInput, StatusInput } from '@groovestack/base'

export const CompanyForm = () => {
  return (
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="address" />
      <MoneyInput source="share_price" />
      <MoneyInput source="market_cap" />
      <StatusInput source="status" />
    </SimpleForm>
  )
}
