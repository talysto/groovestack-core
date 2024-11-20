import React from 'react'

import {
  Datagrid,
  DateInput,
  List,
  ListProps,
  WrapperField,
} from 'react-admin'

import {
  DateField,
  PolymorphicReferenceField,
} from '@groovestack/base'
import { ChangesTable } from './ChangesTable'

// const ActionsField = (props: any) => {
//   return (
//     <EditButton
//       // basePath={props.basePath} // TODO: Upgrade this
//       record={props.record}
//     />
//   )
// }

const versionFilters = [
  <DateInput source="created_at_lte" label="Before" />,
  <DateInput source="created_at_gte" label="After" />,
]

type VersionsTableProps = Omit<ListProps, 'sort' | 'filters'>

export const VersionsTable: React.FC<{
  tableProps?: VersionsTableProps
  changesDisplayed?: number
}> = ({ tableProps, changesDisplayed = 3 }) => {

  return (
    <List
      sort={{ field: 'created_at', order: 'DESC' }}
      filters={versionFilters}
      {...tableProps}
    >
      <Datagrid rowClick="show" >
        <PolymorphicReferenceField source="actor" />
        <PolymorphicReferenceField source="resource" />
        <WrapperField source='Changes' label="Changes">
          <ChangesTable changesDisplayed={changesDisplayed} />
        </WrapperField>
        <DateField source="timestamp" showTime={false} />
      </Datagrid>
    </List>
  )
}
