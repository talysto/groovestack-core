import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import LaunchIcon from '@mui/icons-material/Launch'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import { TikTokIcon } from './TikTokIcon'

import { Box, Stack } from '@mui/material'
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
const SocialMediaIcons = {
  [SocialMediaPlatform.Instagram]: InstagramIcon,
  [SocialMediaPlatform.Facebook]: FacebookIcon,
  [SocialMediaPlatform.Twitter]: TwitterIcon,
  [SocialMediaPlatform.LinkedIn]: LinkedInIcon,
  [SocialMediaPlatform.TikTok]: TikTokIcon,
}

export interface SocialLinkProps extends InputProps {
  platform: SocialMediaPlatform
}

/**
 * SocialLinkInput is a React Admin Input that takes a Social Link Url and styles and adds features to it.
 *
 * FEATURES
 * - Standard React Admin Input property interface
 * - The ability to pass props including platform, which is a SocialMediaPlatform enum in order to render the correct icon.
 * - The ability to open the link in a new tab via the LaunchIcon.
 *
 * NOTES
 * - SocialLinkInput allows users to share their social media links.
 */

export const SocialLinkInput = ({
  platform,
  source,
  ...props
}: SocialLinkProps) => {
  // const { field } = useInput(props)
  props = { ...props, source }

  const IconComponent = SocialMediaIcons[platform]

  const record = useRecordContext()
  const intialLink = source && _.get(record, source)
  const [link, setLink] = useState(intialLink)

  if (!IconComponent) {
    console.error(`No platform set: ${platform}`)
    return null
  }

  return (
    <Stack direction="row" alignItems="center">
      <Box sx={{ pb: 1.5, pr: 1 }}>
        <IconComponent fontSize="large" />
      </Box>
      <TextInput
        {...props}
        variant="outlined"
        onChange={(e) => setLink(e.target.value)}
      />
      <Box sx={{ pb: 1.5, pl: 1 }}>
        <LaunchIcon
          fontSize="small"
          onClick={() => window.open(link, '_blank')}
        />
      </Box>
    </Stack>
  )
}
