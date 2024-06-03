import { Stack } from '@mui/material'
import type { StoryObj } from '@storybook/react'
import { ComponentProps } from 'react'
import { useRecordContext } from 'react-admin'
import { withEditFormContext } from '../../../../../../stories/RAStorybookDecorators'
import { JsonDisplay } from '../../JsonDisplay'
import { SocialLinkInput } from './SocialLinkInput'

export default {
  title: 'Core Labs/socialLink/SocialLinkInput',
  component: SocialLinkInput,
  decorators: [withEditFormContext],
  argTypes: {
    source: {
      control: 'select',
      options: ['tiktok_url', 'instagram_url', 'facebook_url', 'twitter_url'],
    },
  },
  args: {
    source: 'tiktok_url',
  },
  parameters: {
    controls: {
      expanded: true,
      exclude: ['sx', 'bar', 'componentProps', 'record', 'variant'],
    },
  },

  tags: ['autodocs'], // https://storybook.js.org/docs/react/writing-docs/autodocs
}

type SocialLinkPropsAndCustomArgs = ComponentProps<typeof SocialLinkInput>
type Story = StoryObj<SocialLinkPropsAndCustomArgs>

/**
 * SocialLinkInput can take standard RA InputProps props (source, etc) and SocialLink props such as icon.
 */
/* TODO finish implementing: valdations, etc.  */

export const BasicUsage: Story = {
  render: (args) => {
    const record = useRecordContext()
    return (
      <>
        <Stack direction="row" gap={3} alignItems="center">
          <SocialLinkInput
            {...args}
            // source="tiktok_url"
          />
        </Stack>
        {JsonDisplay({ tiktok_url: record?.tiktok_url })}
      </>
    )
  },
}
