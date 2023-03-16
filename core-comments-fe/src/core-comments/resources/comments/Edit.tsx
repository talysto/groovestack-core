import React from 'react'

import {
  Edit,
  SimpleForm,
  TextInput,
  TextField,
  EditProps,
  SimpleShowLayout,
} from 'react-admin'
import { PolymorphicReferenceField } from './PolymorphicReferenceField'

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
