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
  useRecordContext,
  WrapperField
} from 'react-admin'
import { PolymorphicReferenceField } from './PolymorphicReferenceField'

const ActionsField = (props: any) => {
  return (
    <EditButton
      // basePath={props.basePath} // TODO: Upgrade this
      record={props.record}
    />
  )
}

const versionFilters = [
  <DateInput source="created_at_lte" label="Before" />,
  <DateInput source="created_at_gte" label="After" />,
  <ReferenceInput
    alwaysOn
    label="Actor"
    source="actor_id"
    reference="User"
    perPage={10}
  >
    <AutocompleteInput />
  </ReferenceInput>,
]

export const ChangesTable = () => {
  const record = useRecordContext();
  if (!record) return null;
  return (
    <table>
      <tbody>
      {record && record.changes && record.changes.map((change: any) => (
        <tr key={change[0]}>
          <td style={{ textTransform: 'uppercase', fontSize: '80%' }}>{change[0]}</td>
          <td>
            {change[1][1]} (
            <span style={{ textDecoration: 'line-through' }}>
              {change[1][0]}
            </span>
            )
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  )
}

export const VersionsTable: React.FC<{ tableProps?: any}> = ({ tableProps }) => {
  return (
    <List
      sort={{ field: 'created_at', order: 'DESC' }}
      filters={typeof tableProps !== 'undefined' ?
        ("filters" in tableProps ? tableProps.filters : versionFilters)
        : versionFilters}    >
      <Datagrid rowClick="show">
        <PolymorphicReferenceField source="actor" />
        <PolymorphicReferenceField source="resource" />
        <WrapperField label="Changes">
          <ChangesTable />
        </WrapperField>
        <DateField source="timestamp" label="Date" />
      </Datagrid>
    </List>
  )
}
