import type { Meta, StoryObj } from '@storybook/react'

import { DateField, SimpleShowLayout, TextField } from 'react-admin'
import { clickToCopy } from '../src/react-admin/fields/clickToCopy'
import { withReactAdminContext } from './RAStorybookDecorators'
import React from 'react'

import { faker } from '@faker-js/faker'
import { TimeAgoField } from '../src/react-admin/fields/TimeAgoField'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'CORE/React Admin/Utilities/clickToCopy',
  // component: clickToCopy,
  decorators: [withReactAdminContext],
  tags: ['autodocs'], // https://storybook.js.org/docs/react/writing-docs/autodocs,
  parameters: { layout: 'centered' },
}
// satisfies Meta<typeof clickToCopy>

export default meta
type Story = StoryObj<typeof meta>


export const Default: Story = {
  render: () => <SimpleShowLayout record={{ id: 1, name: 'Name', amount: '25.43', created_at: Date.now() }}>
      <TextField source="name" {...clickToCopy}/>
      <TextField source="amount" />
      <DateField source="created_at" {...clickToCopy} />
      </SimpleShowLayout>
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
// export const Default: Story = {
//   args: {
//     source: 'created_at',
//   },
// }