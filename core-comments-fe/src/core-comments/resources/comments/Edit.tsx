import {
  Edit,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
} from 'react-admin'

import { PolymorphicReferenceField } from '@groovestack/base'

export const CommentEdit = () => {
  return (
    <Edit>
      <SimpleShowLayout>
        <TextField source="id" />
        <PolymorphicReferenceField source="author" />
        <PolymorphicReferenceField source="resource" />
      </SimpleShowLayout>
      <SimpleForm>
        <TextInput source="body" multiline />
      </SimpleForm>
    </Edit>
  )
}
