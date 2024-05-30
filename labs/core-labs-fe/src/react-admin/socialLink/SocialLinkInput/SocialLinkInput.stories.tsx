import { Stack } from '@mui/material'
import type { StoryObj } from '@storybook/react'
import { ComponentProps } from 'react'
import { useRecordContext } from 'react-admin'
import { withEditFormContext } from '../../../../../../stories/RAStorybookDecorators'
import { JsonDisplay } from '../../JsonDisplay'
import { SocialLinkInput, SocialMediaPlatform } from './SocialLinkInput'

export default {
  title: 'Core Labs/socialLink/SocialLinkInput',
  component: SocialLinkInput,
  decorators: [withEditFormContext],
  argTypes: {
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
 * SocialLinkInput can take standard RA InputProps props (source, etc) and SocialLink props such as platform.
 */
/* TODO finish implementing inline link, valdations, decide how we are going to add new, etc.  */

export const BasicUsage: Story = {
  render: (args) => {
    // const { max, size, precision } = args
    const record = useRecordContext()
    return (
      <>
        <Stack direction="row" gap={3} alignItems="center">
          <SocialLinkInput
            source="instagram_url"
            platform={SocialMediaPlatform.Instagram}
            // {...args}
            // componentProps={{ max, size, precision }}
          />
        </Stack>
        {JsonDisplay({ socialLink: record?.instagram_url })}
      </>
    )
  },
}
