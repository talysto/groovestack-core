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
  WrapperField,
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
  // <SearchInput source="q" alwaysOn />,
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
        {record.changes.map((change) => (
          <tr key={change.field}>
            <td style={{ textTransform: 'uppercase', fontSize: '80%' }}>{change.field}</td>
            <td>
              {change.newValue} (
              <span style={{ textDecoration: 'line-through' }}>
                {change.oldValue}
              </span>
              )
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}


export const VersionsTable = () => {
  return (
    <List
      sort={{ field: 'created_at', order: 'DESC' }}
      filters={versionFilters}
    >
      <Datagrid>
        <PolymorphicReferenceField source="actor" />
        <PolymorphicReferenceField source="resource" />
        {/* <TextField source="changes" sortable={false} /> */}
        <WrapperField label="Changes">
          <ChangesTable />
        </WrapperField>
        <TextField source="timestamp"/>
        {/* <DateField source="created_at" label="Date" /> */}
        {/* <ActionsField source="actions" /> */}
      </Datagrid>
    </List>
  )
}
