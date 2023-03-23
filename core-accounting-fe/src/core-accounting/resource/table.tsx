import React from 'react'

import { List, Datagrid, TextField, NumberField, useRecordContext, ReferenceField, DateField } from 'react-admin'

import { MoneyField } from './MoneyField'
import { TimeAgoField } from './TimeAgoField'

import { PolymorphicReferenceField } from './PolymorphicReferenceField'

export const Table: React.FC<{ datagridProps?: any; tableProps?: any, children?: any }> = ({ datagridProps, tableProps, children }) => {
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


export const TransferList = () => (
  <List>
    <Datagrid rowClick="edit">
      <NumberField source="amount" />
      <TextField source="balance" />
      <TextField source="detailId" />
      <TextField source="detailType" />
      <TextField source="metadata" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
      <PolymorphicReferenceField source="author" />
      <PolymorphicReferenceField source="resource" />
      <ReferenceField source="userId" reference="users" />
      <TextField source="account" />
      <TextField source="scope" />
      <TextField source="code" />
      <ReferenceField source="partnerId" reference="resource" />
      <TextField source="partnerAccount" />
      <TextField source="partnerScope" />
      <TextField source="id" />
    </Datagrid>
  </List>
);