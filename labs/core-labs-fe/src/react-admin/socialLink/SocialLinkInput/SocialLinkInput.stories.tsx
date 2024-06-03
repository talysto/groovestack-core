import FacebookIcon from '@mui/icons-material/Facebook'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import { Stack } from '@mui/material'
import type { StoryObj } from '@storybook/react'
import { ComponentProps } from 'react'
import { useRecordContext } from 'react-admin'
import { withEditFormContext } from '../../../../../../stories/RAStorybookDecorators'
import { JsonDisplay } from '../../JsonDisplay'
import { SocialLinkInput } from './SocialLinkInput'
import { TikTokIcon } from './TikTokIcon'

const iconMap = {
  TikTokIcon,
  LinkedInIcon,
  TwitterIcon,
  FacebookIcon,
}

export default {
  title: 'Core Labs/socialLink/SocialLinkInput',
  component: SocialLinkInput,
  decorators: [withEditFormContext],
  argTypes: {
    source: {
      control: 'select',
      options: ['tiktok_url', 'instagram_url', 'facebook_url', 'twitter_url'],
    },
    icon: {
      control: 'select',
      options: Object.keys(iconMap),
    },
    disabled: { control: 'boolean' },
  },
  args: {
    source: 'tiktok_url',
    icon: undefined,
    disabled: false,
  },
  parameters: {
    controls: {
      expanded: true,
      exclude: ['sx', 'bar', 'componentProps', 'record', 'variant'],
    },
  },
  tags: ['autodocs'],
}

type SocialLinkPropsAndCustomArgs = ComponentProps<typeof SocialLinkInput> & {
  icon: keyof typeof iconMap
}
type Story = StoryObj<SocialLinkPropsAndCustomArgs>

export const BasicUsage: Story = {
  render: (args) => {
    const record = useRecordContext()
    const IconComponent = iconMap[args.icon]

    return (
      <>
        <Stack direction="row" gap={3} alignItems="center">
          <SocialLinkInput {...args} icon={IconComponent} />
        </Stack>
        {JsonDisplay({ tiktok_url: record?.tiktok_url })}
      </>
    )
  },
}
