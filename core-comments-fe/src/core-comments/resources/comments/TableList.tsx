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
  useListContext,
  useRecordContext,
  FilterForm,
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
  <DateInput source="created_at_lte" label="Before" />,
  <DateInput source="created_at_gte" label="After" />,
  <PolymorphicReferenceInput source="author" />,
  <PolymorphicReferenceInput source="resource" />,
]

export const CommentsTable: React.FC<{ tableProps?: any}> = ({ tableProps }) => {
  return (
    <List
      sort={{ field: 'created_at', order: 'DESC' }}
      filters={tableProps.filters ? tableProps.filters : commentFilters}
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
