import React from 'react'

import { List, Datagrid, TextField, NumberField} from 'react-admin'

import { TimeAgoField } from './TimeAgoField'

export const Table = () => {
  return (
    <List exporter={false}>
      <Datagrid sort={{ field: 'createdAt', order: 'DSC' }} rowClick="show">
        <TextField source="id" sortable={false} />
        <TextField source="account" sortable={false} />
        <TextField source="scope" sortable={false} />
        <TextField source="code" sortable={false} />
        <NumberField label="Amount" source="amount.formatted_amount" sortable={false} />
        <NumberField label="Balance" source="balance.formatted_amount" sortable={false} />
        <TimeAgoField label="Created" source="createdAt" />
      </Datagrid>
    </List>
  )
}