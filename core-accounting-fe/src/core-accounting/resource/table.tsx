import React from 'react'

import { List, Datagrid, TextField, NumberField, useRecordContext, ReferenceField, DateField, SearchInput, SavedQueriesList, FilterLiveSearch, FilterList, FilterListItem } from 'react-admin'

import { MoneyField } from './MoneyField'
import { TimeAgoField } from './TimeAgoField'

import { PolymorphicReferenceField } from './PolymorphicReferenceField'
import { Card, CardContent } from '@mui/material'
import MailIcon from '@mui/icons-material/MailOutline';

export const PostFilterSidebar = () => (
  <Card sx={{ order: -1, mr: 2, mt: 9, width: 200 }}>
    <CardContent>
      <FilterList label="account" icon={<MailIcon />}>
        <FilterListItem label="aqd_treasury" value={{ account: 'aqd_treasury' }} />
        <FilterListItem label="aqd_tokens" value={{ account: 'aqd_tokens' }} />
      </FilterList>
    </CardContent>
  </Card>
)

export const Table: React.FC<{ datagridProps?: any; tableProps?: any, children?: any }> = ({ datagridProps, tableProps, children }) => {
  return (
    <List aside={<PostFilterSidebar/>} exporter={false} {...tableProps}>
      <Datagrid bulkActionButtons={false} sort={{ field: 'createdAt', order: 'DESC' }} rowClick="show">
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