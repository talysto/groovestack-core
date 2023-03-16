import React from 'react'

import { ReferenceField, TextField } from "react-admin";

export const AuthorField = (props: any) => {
  if (!props.record) return null

  const { record } = props;
  const reference = `admin/${record.authorType.toLowerCase()}`

  return (
    <ReferenceField record={record} source="authorId" reference={reference}>
      <TextField source="name" />
    </ReferenceField>
  )
}