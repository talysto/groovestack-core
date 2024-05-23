import React, { useState, useEffect } from 'react';
import { Stack } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import { useRecordContext } from 'react-admin';
import { withEditFormContext } from '../../stories/RAStorybookDecorators';
import { ToggleButtonInput } from '../src/react-admin/inputs/ToggleButtonInput';

const choices = [
  { id: 'sm', name: 'SM' },
  { id: 'md', name: 'MD' },
  { id: 'lg', name: 'LG' },
];

const choices2 = [
  { id: 'sm', name: 'Small' },
  { id: 'md', name: 'Medium' },
  { id: 'lg', name: 'Large' },
  { id: 'xl', name: 'Extra Large' },
  { id: 'xxl', name: 'Extra Extra Large' },
  { id: 'xxxl', name: 'Extra Extra Extra Large' },
];

const choices3 = [
  { id: 'sm', name: 'SM' },
  { id: 'md', name: 'MD' },
  { id: 'lg', name: 'LG' },
  { id: 'xl', name: 'XL' },
  { id: 'xxl', name: 'XXL' },
  { id: 'xxxl', name: 'XXXL' },
  { id: 'xxxxl', name: 'XXXXL' },
  { id: 'xxxxxl', name: 'XXXXXL' },
  { id: 'xxxxxxl', name: 'XXXXXXL' },
  { id: 'xxxxxxxl', name: 'XXXXXXXL' },
];

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Core Base/Inputs/ToggleButtonInput',
  component: ToggleButtonInput,
  decorators: [withEditFormContext],
  tags: ['autodocs'],
  parameters: { layout: 'centered' },

  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
    choices: {
      control: 'select',
      options: ['choices 1', 'choices 2', 'choices 3'],
      mapping: {
        'choices 1': choices,
        'choices 2': choices2,
        'choices 3': choices3,
        
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
} satisfies Meta<typeof ToggleButtonInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {
  render: (args) => {
    const [currentChoices, setCurrentChoices] = useState(args.choices);
    const record = useRecordContext();
    console.log('record', record);
    console.log('record', record);

    // Update choices if args.choices changes
    useEffect(() => {
      setCurrentChoices(args.choices);
    }, [args.choices]);

    const key = JSON.stringify(currentChoices);

    return (
      <Stack direction="row" gap={3} alignItems="center">
        <ToggleButtonInput
          key={key} // Forces remount on choices change
          source="size"
          choices={currentChoices}
          {...args}
        />
        <code style={{ whiteSpace: 'nowrap' }}>
          {JSON.stringify(`size: ${record?.size}`, null, 2)}
        </code>
      </Stack>
    );
  },
  args: {
    choices: choices,
  },
};
