import React from "react";

import { Show, SimpleShowLayout, TextField, NumberField } from 'react-admin';

import { CoreBase } from '../../../../core-base-fe/src/core-base'
const CoreTimeAgoField = CoreBase.CoreTimeAgoField

export const LineShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" sortable={false} />
      <TextField source="account" sortable={false} />
      <TextField source="scope" sortable={false} />
      <TextField source="code" sortable={false} />
      <NumberField label="Amount" source="amount.formatted_amount" sortable={false} />
      <NumberField label="Balance" source="balance.formatted_amount" sortable={false} />
      <CoreTimeAgoField label="Created" source="created_at" />
    </SimpleShowLayout>
  </Show>
);