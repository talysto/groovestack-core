import {
  DateField, SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput
} from 'react-admin';
import { inlineLayout } from '../inlineLayout';
import { StatusInput } from '@moonlight-labs/core-base-fe';

export const CompanyForm = () => {
  return <SimpleForm>
    <TextInput source="name" fullWidth />
    <TextInput source="address" fullWidth />
    <StatusInput source="status" />
  </SimpleForm>
};
