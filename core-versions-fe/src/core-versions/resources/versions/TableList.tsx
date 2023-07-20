import React from 'react'

import {
  List,
  Datagrid,
  EditButton,
  DateInput,
  useRecordContext,
  WrapperField,
} from 'react-admin'

import { PolymorphicReferenceField, DateField } from '@moonlight-labs/core-base-fe'

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

export const ChangesTable = ({
  changesDisplayed,
}: {
  changesDisplayed: number
}) => {
  const record = useRecordContext()
  if (!record) return null
  return (
    <table style={{ maxWidth: '1000px', display: 'inline-block' }}>
      <tbody>
        {record &&
          record.changes &&
          record.changes
            .filter((item: any, idx: number) => idx < changesDisplayed)
            .map((change: any) => (
              <tr key={change[0]}>
                <td style={{ textTransform: 'uppercase', fontSize: '80%' }}>
                  {change[0]}
                </td>
                <td>
                  {/* style={{inlineSize: '1000px', overflowWrap: 'anywhere'}} > */}
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
