import React from 'react'

import { List, Datagrid, TextField, FunctionField} from 'react-admin'

import { TimeAgoField } from './TimeAgoField'

export const Table = () => {
  return (
    <List exporter={false}>
      <Datagrid sort={{ field: 'createdAt', order: 'DSC' }} rowClick="show">
        {/* <FunctionField
          label="Job"
          render={(record: any) => (
            <div>
              <div>{record.type}</div>
              <small style={{ marginRight: 5 }}>
                {record.id.substring(0, 6)}
              </small>
            </div>
          )}
        /> */}

        <TextField source="id" sortable={false} />
        {/* <NumberField source="priority" /> */}
        <TimeAgoField label="Created" source="createdAt" />
      </Datagrid>
    </List>
  )
}