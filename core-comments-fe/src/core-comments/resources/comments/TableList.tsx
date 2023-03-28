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
  AutocompleteInput,
  RecordContext,
  useRecordContext,
} from 'react-admin'
import { PolymorphicReferenceField } from './PolymorphicReferenceField'
import { PolymorphicReferenceInput } from './PolymorphicReferenceInput'

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
  // <PolymorphicReferenceField source="resource" />,
  // <PolymorphicReferenceInput source="author"/>,
  <ReferenceInput alwaysOn label="Author" source="author_id" reference="User" perPage={10}>
    <AutocompleteInput />
  </ReferenceInput>,
  <ReferenceInput alwaysOn label="Resource" source="resource_id" reference="User" perPage={10}>
    <AutocompleteInput />
  </ReferenceInput>,
]

    {/* alwaysOn label="Author" perPage={10}
    <AutocompleteInput />
  </PolymorphicReferenceInput>, */}

export const CommentsTable = () => {
  return (
    <List
      sort={{ field: 'created_at', order: 'DESC' }}
      filters={commentFilters}
    >
      <Datagrid rowClick="edit">
        <PolymorphicReferenceField source="author" />
        <PolymorphicReferenceField source="resource" />
        <TextField source="body" label="Comment" sortable={false} />
        <DateField source="created_at" label="Date" />
        <ActionsField source="actions" />
      </Datagrid>
    </List>
  )
}
