import React from 'react'

import { List, Datagrid, TextField } from 'react-admin'

import { MoneyField } from './MoneyField'

import { CoreBase } from '../../../../core-base-fe/src/core-base'
const CoreTimeAgoField = CoreBase.CoreTimeAgoField

export const Table: React.FC<{ datagridProps?: any; tableProps?: any, children?: any }> = ({ datagridProps, tableProps, children }) => {
  return (
    <List exporter={false} {...tableProps}>
      <Datagrid bulkActionButtons={false} sort={{ field: 'createdAt', order: 'DESC' }} rowClick="show" {...datagridProps}>

        {children}
        <TextField source="code" sortable={false} />
        <MoneyField source="amount" />
        <MoneyField source="balance" />
        {/* <NumberField label="Amount" source="amount.formatted_amount" sortable={false} />
        <NumberField label="Balance" source="balance.formatted_amount" sortable={false} /> */}
        <CoreTimeAgoField label="Created" source="created_at" />
      </Datagrid>
    </List>
  )
}