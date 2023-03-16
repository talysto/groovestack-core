import React from 'react'

import {
  Edit,
  SimpleForm,
  TextInput,
  TextField,
  EditProps,
  SimpleShowLayout,
} from 'react-admin'

export const CommentsEdit = () => {
  return (
    <Edit>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="author.name" />
        <TextField source="resource.name" />
        <TextField source="resource.type" />
      </SimpleShowLayout>
      <SimpleForm>
        {/* <AuthorField source="author" addLabel /> */}
        {/* <ResourceField source="resource" addLabel /> */}
        <TextInput source="body" multiline />
      </SimpleForm>
    </Edit>
  )
}
