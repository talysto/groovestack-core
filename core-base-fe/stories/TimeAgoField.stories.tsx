import type { Meta, StoryObj } from '@storybook/react'
import fakeRestProvider from 'ra-data-fakerest'
import { Admin, Datagrid, DateField, List, Resource } from 'react-admin'
import { TimeAgoField } from '../src/react-admin/fields/TimeAgoField'
import { withFormContext } from '../../stories/RAStorybookDecorators'
import React from 'react'

import { faker } from '@faker-js/faker'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'React Admin/Fields/TimeAgoField',
  component: TimeAgoField,
  decorators: [withFormContext],
  tags: ['autodocs'], // https://storybook.js.org/docs/react/writing-docs/autodocs,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof TimeAgoField>

export default meta
type Story = StoryObj<typeof meta>

const dataProvider = () =>
  fakeRestProvider({
    timestamps: [
      { created_at: new Date('1946-09-05') },
      { created_at: new Date() },
      { created_at: faker.date.past() },
      { created_at: faker.date.future() },
      { created_at: faker.date.soon() },
      { created_at: faker.date.recent() },
    ],
  })

const TimestampList = () => (<List actions={false} >
    <Datagrid bulkActionButtons={false}>
      <DateField source="created_at" label="DateField" />
      <TimeAgoField source="created_at" label="TimeAgoField" />
    </Datagrid>
  </List>
)

export const Examples: Story = {
  render: () => (
    <Admin dataProvider={dataProvider()}>
      <Resource name="timestamps" list={TimestampList} />
    </Admin>
  )
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
// export const Default: Story = {
//   args: {
//     source: 'created_at',
//   },
// }