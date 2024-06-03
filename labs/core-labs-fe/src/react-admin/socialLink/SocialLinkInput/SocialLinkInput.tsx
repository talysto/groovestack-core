import InstagramIcon from '@mui/icons-material/Instagram'
import LaunchIcon from '@mui/icons-material/Launch'
import PublicIcon from '@mui/icons-material/Public'
import { TikTokIcon } from './TikTokIcon'

import { Box, Button, Stack } from '@mui/material'
import _ from 'lodash'
import { useState } from 'react'
import { InputProps, TextInput, useRecordContext } from 'react-admin'

export enum SocialMediaPlatform {
  Instagram = 'Instagram',
  Facebook = 'Facebook',
  Twitter = 'Twitter',
  LinkedIn = 'LinkedIn',
  TikTok = 'TikTok',
}
export interface SocialLinkProps extends InputProps {
  icon?: React.ElementType
}

export const platformConfig = {
  Instagram: {
    icon: InstagramIcon,
    // validation: //callback to validate the url?
  },
  TikTok: {
    icon: TikTokIcon,
    // validation:
  },
  Default: {
    icon: PublicIcon,
    // validation:
  },
}

/**
 * SocialLinkInput is a React Admin Input that takes a Social Link Url and styles and adds features to it.
 *
 * FEATURES
 * - Standard React Admin Input property interface
 * - Smart detection of the platform based on the source prop which changes the icon
 * - The ability to pass props including icon, to override default icon.
 * - The ability to open the link in a new tab via the LaunchIcon.
 * - disabled also hides the LaunchIcon.
 *
 * NOTES
 * - SocialLinkInput allows users to share their social media links.
 */

export const SocialLinkInput = ({
  icon,
  source,
  disabled,
  sx,
  ...props
}: SocialLinkProps) => {
  // const { field } = useInput(props)
  props = { ...props, source, disabled }

  const record = useRecordContext()

  const platform = source.includes('tiktok')
    ? platformConfig.TikTok
    : source.includes('instagram')
    ? platformConfig.Instagram
    : platformConfig.Default
  icon ? (platform.icon = icon) : null

  source.includes('tiktok') ? 'tiktok' : source
  const intialLink = source && _.get(record, source)
  const [link, setLink] = useState(intialLink)

  return (
    <Stack direction="row" alignItems={'center'} sx={sx}>
      <Box sx={{ pb: 1.75, pr: 1 }}>
        <platform.icon fontSize="large" />
      </Box>
      <TextInput
        {...props}
        variant="outlined"
        onChange={(e) => setLink(e.target.value)}
      />
      <Button
        size="large"
        sx={{ p: 0, mb: 1.75, minWidth: '36px', display: disabled ? 'none' : 'block'}}
      >
        <LaunchIcon
          fontSize="small"
          onClick={() => window.open(link, '_blank')}
        />
      </Button>
    </Stack>
  )
}
