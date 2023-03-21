import React from 'react'

import { List, Datagrid, TextField, NumberField, useRecordContext} from 'react-admin'

import { MoneyField } from './MoneyField'
import { TimeAgoField } from './TimeAgoField'

export const Table: React.FC<{datagridProps?: any; tableProps?: any, children?: any}> = ({datagridProps, tableProps, children}) => {
  return (
    <List exporter={false} {...tableProps}>
      <Datagrid sort={{ field: 'createdAt', order: 'DESC' }} rowClick="show">
        {/* <TextField source="id" sortable={false} /> */}
        {/* <TextField source="account" sortable={false} />
        <TextField source="scope" sortable={false} /> */}
        {children}
        <TextField source="code" sortable={false} />
        <MoneyField source="amount" />
        <MoneyField source="balance" />
        {/* <NumberField label="Amount" source="amount.formatted_amount" sortable={false} />
        <NumberField label="Balance" source="balance.formatted_amount" sortable={false} /> */}
        <TimeAgoField label="Created" source="createdAt" />
      </Datagrid>
    </List>
  )
}