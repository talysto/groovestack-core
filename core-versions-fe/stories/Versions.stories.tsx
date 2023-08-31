import type { Meta, StoryObj } from '@storybook/react'
import { Versions } from '../src/core-versions'
import { withFormContext } from '../../stories/RAStorybookDecorators';
import { Admin, Resource } from 'react-admin';
import fakeRestProvider from 'ra-data-fakerest'

import { faker } from '@faker-js/faker'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'CORE/Versions',
  component: Versions.List,
  decorators: [withFormContext],
  parameters: { layout: 'centered'},
  tags: ['autodocs']  // https://storybook.js.org/docs/react/writing-docs/autodocs
} satisfies Meta<typeof Versions.List>;

export default meta;
type Story = StoryObj<typeof meta>;


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

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  render: () => (
    <Admin dataProvider={dataProvider()}>
      <Resource name="versions" list={Versions.List} />
    </Admin>
  )
}