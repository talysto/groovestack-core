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
import { CoreBase } from '../../../../../core-base-fe/src/core-base'
const CoreDateField = CoreBase.CoreDateField

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
]

export const CommentsTable: React.FC<{ tableProps?: any }> = ({ tableProps }) => {
  return (
    <List
      sort={{ field: 'created_at', order: 'DESC' }}
      filters={commentFilters}
      {...tableProps}
      >
      <Datagrid rowClick="edit">
        <PolymorphicReferenceField source="author" />
        <PolymorphicReferenceField source="resource" />
        <TextField source="body" label="Comment" sortable={false} />
        <CoreDateField source="created_at" showTime={false} label="Date" />
        <ActionsField source="actions" />
      </Datagrid>
    </List>
  )
}