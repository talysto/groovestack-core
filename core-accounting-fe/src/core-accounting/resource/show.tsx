import React from 'react'

import { Show, SimpleShowLayout, TextField, NumberField } from 'react-admin'

import { TimeAgoField } from '@moonlight-labs/core-base-fe'

export const LineShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" sortable={false} />
      <TextField source="account" sortable={false} />
      <TextField source="scope" sortable={false} />
      <TextField source="code" sortable={false} />
      <NumberField
        label="Amount"
        source="amount.formatted_amount"
        sortable={false}
      />
      <NumberField
        label="Balance"
        source="balance.formatted_amount"
        sortable={false}
      />
      <TimeAgoField label="Created" source="created_at" />
    </SimpleShowLayout>
  </Show>
)
