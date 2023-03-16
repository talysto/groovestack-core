import React from 'react'

import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  ListProps,
  SearchInput,
  DateInput,
  ReferenceInput,
  SelectInput,
  ReferenceField,
} from 'react-admin'

// import { AuthorField } from './AuthorField'
import { ResourceField } from './ResourceField'

const ActionsField = (props: any) => {
  return (
    <EditButton
      // basePath={props.basePath} // TODO: Upgrade this
      record={props.record}
    />
  )
}

const commentFilters = [
  <SearchInput source="q" alwaysOn />,
  <DateInput source="created_at_lte" label="Before" />,
  <DateInput source="created_at_gte" label="After" />,
  // <ReferenceInput
  //     source="authorId"
  //     label="Author"
  //     reference="User" // TODO this is a polymorphic reference on comments table so shouldn't be limited to User
  //     allowEmpty
  // >
  //     <SelectInput optionText="name" />
  // </ReferenceInput>,
]

export const CommentsList = () => {
  return (
    <List
      sort={{ field: 'created_at', order: 'DESC' }}
      filters={commentFilters}
    >
      <Datagrid rowClick="edit">
        {/* <TextField source="id" /> */}

        <TextField source="author.name" label="Author" />
        <TextField source="resource.name" label="Resource" />
        <TextField source="resource.type" label="Resource Type" />
        {/* <ReferenceField
              label="Resource"
              source="resource.id"
              reference={(resource) => resource.type}
              link="show"
            >
              <TextField source="name" />
            </ReferenceField> */}
        <ResourceField source="resource" />
        <TextField source="body" label="Comment" />
        <DateField source="created_at" label="Date" />
        <ActionsField source="actions" />
      </Datagrid>
    </List>
  )
}
