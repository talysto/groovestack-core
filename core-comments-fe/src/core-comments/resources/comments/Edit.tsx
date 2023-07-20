import React from 'react'

import {
  Edit,
  SimpleForm,
  TextInput,
  TextField,
  EditProps,
  SimpleShowLayout,
} from 'react-admin'

import { PolymorphicReferenceField } from '@moonlight-labs/core-base-fe'

export const CommentEdit = () => {
  return (
    <Edit>
      <SimpleShowLayout>
        <TextField source="id" />
        <PolymorphicReferenceField source="author" />
        <PolymorphicReferenceField source="resource" />
      </SimpleShowLayout>
      <SimpleForm>
        <TextInput source="body" multiline sx={{ width: 350 }} />
      </SimpleForm>
    </Edit>
  )
}
