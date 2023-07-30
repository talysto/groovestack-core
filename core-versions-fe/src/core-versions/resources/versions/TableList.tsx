import React from 'react'

import {
  Datagrid,
  DateInput,
  EditButton,
  List,
  WrapperField,
} from 'react-admin'

import {
  DateField,
  PolymorphicReferenceField,
} from '@moonlight-labs/core-base-fe'
import { ChangesTable } from './ChangesTable'

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
]

export const VersionsTable: React.FC<{
  tableProps?: any
  changesDisplayed?: number
}> = ({ tableProps, changesDisplayed = 3 }) => {
  const rowStyle = (record: any, index: number) => ({
    // backgroundColor: record.changes >= 5 ? '#efe' : 'white',
    // height: 2, // Set the row height to 50 pixels
    // width: 5
  })

  return (
    <List
      sort={{ field: 'created_at', order: 'DESC' }}
      filters={versionFilters}
      {...tableProps}
    >
      <Datagrid rowClick="show" rowStyle={rowStyle}>
        <PolymorphicReferenceField source="actor" />
        <PolymorphicReferenceField source="resource" />
        <WrapperField label="Changes">
          <ChangesTable changesDisplayed={changesDisplayed} />
        </WrapperField>
        <DateField source="timestamp" showTime={false} />
      </Datagrid>
    </List>
  )
}
