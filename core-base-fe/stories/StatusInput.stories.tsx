import React, { useState, useEffect } from 'react';
import { Stack } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import { useRecordContext } from 'react-admin';
import { withEditFormContext } from '../../stories/RAStorybookDecorators';
import { StatusInput } from '../src/react-admin/inputs/StatusInput';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Core Base/Inputs/StatusInput',
  component: StatusInput,
  decorators: [withEditFormContext],
  tags: ['autodocs'],
  parameters: { layout: 'centered' },

  argTypes: {
    label: {
      control: 'text',
    },
  },
} satisfies Meta<typeof StatusInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {
  render: (args) => {
    const record = useRecordContext();
    // console.log('record', record);

    return (
      <Stack direction="row" gap={3} alignItems="center">
        <StatusInput
          source="status"
          {...args}
        />
        <code style={{ whiteSpace: 'nowrap' }}>
          {JSON.stringify(`status: ${record?.status}`, null, 2)}
        </code>
        <code style={{ whiteSpace: 'nowrap' }}>
          {/* {JSON.stringify(`status: ${record?.status_events.map(se=>se.name)}`, null, 2)} */}
        </code>
      </Stack>
    );
  },
  // args: {
  // },
};
