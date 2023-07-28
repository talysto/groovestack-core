import {
  DateField,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
} from 'react-admin'
import { inlineLayout } from '../inlineLayout'
import { MoneyInput, StatusInput } from '@moonlight-labs/core-base-fe'

export const CompanyForm = () => {
  return (
    <SimpleForm>
      <TextInput source="name" fullWidth />
      <TextInput source="address" fullWidth />
      <MoneyInput source="share_price" />
      <MoneyInput source="market_cap" />
      <StatusInput source="status" />
    </SimpleForm>
  )
}
