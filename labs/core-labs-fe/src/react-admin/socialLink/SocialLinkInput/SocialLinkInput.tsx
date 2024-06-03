import InstagramIcon from '@mui/icons-material/Instagram'
import LaunchIcon from '@mui/icons-material/Launch'
import { TikTokIcon } from './TikTokIcon'
import PublicIcon from '@mui/icons-material/Public';

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
}

export const platformConfig = {
  Instagram: {
    icon: InstagramIcon,
    // validation: 'instagram.com' //callback to validate the url?
  },
  TikTok: {
    icon: TikTokIcon,
    // validation: 'tiktok.com'
  },
  Default: {
    icon: PublicIcon,
    // validation: ''// is this a website?
  }

}

/**
 * SocialLinkInput is a React Admin Input that takes a Social Link Url and styles and adds features to it.
 *
 * FEATURES
 * - Standard React Admin Input property interface
 * - Smart detection of the platform based on the source prop which changes the icon
 * - The ability to pass props including icon, to override default icon.
 * - The ability to open the link in a new tab via the LaunchIcon.
 * - disabled also disables the LaunchIcon.
 *
 * NOTES
 * - SocialLinkInput allows users to share their social media links.
 */

export const SocialLinkInput = ({
  // platform,
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
        disabled={disabled}
        size="large"
        sx={{ p: 0, mb: 2.5, minWidth: '36px' }}
      >
        <LaunchIcon
          fontSize="small"
          onClick={() => window.open(link, '_blank')}
        />
      </Button>
    </Stack>
  )
}
