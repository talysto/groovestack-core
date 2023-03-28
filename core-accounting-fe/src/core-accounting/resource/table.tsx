import React from 'react'

import { List, Datagrid, TextField, NumberField, useRecordContext, ReferenceField, DateField, SearchInput, SavedQueriesList, FilterLiveSearch, FilterList, FilterListItem, SelectInput } from 'react-admin'

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

const lineFilters = [
  <SelectInput
    source="account"
    choices={[
      { id: 'aqd_treasury', name: 'AQD Treasury' },
      { id: 'aqd_tokens', name: 'AQD Tokens' },
    ]}
  />
];

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
        <TimeAgoField label="Created" source="createdAt" />
      </Datagrid>
    </List>
  )
}