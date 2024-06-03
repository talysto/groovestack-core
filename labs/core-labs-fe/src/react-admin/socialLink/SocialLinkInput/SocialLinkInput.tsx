import InstagramIcon from '@mui/icons-material/Instagram'
import LaunchIcon from '@mui/icons-material/Launch'
import PublicIcon from '@mui/icons-material/Public'
import { TikTokIcon } from './TikTokIcon'

import { Box, Button, Stack } from '@mui/material'
import _ from 'lodash'
import React, { useState } from 'react'
import { InputProps, TextInput, Validator, required, useRecordContext } from 'react-admin'

export const platformConfig = {
  Instagram: {
    icon: InstagramIcon,
    domain: 'instagram.com',
  },
  TikTok: {
    icon: TikTokIcon,
    domain: 'tiktok.com',
  },
  Default: {
    icon: PublicIcon,
    domain: '',
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
 * - Default 'smart' validation on the domain of the link pulled from the source name.
 * - disabled also hides the LaunchIcon.
 *
 * NOTES
 * - SocialLinkInput allows users to share their social media links.
 */

export interface SocialLinkProps extends InputProps {
  // icon?: (OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; }) | ((props: SvgIconProps) => Element),
  icon?: React.ElementType
  source: string
  disabled?: boolean
  validate?: Validator | Validator[]
  sx?: any
}


export const SocialLinkInput = ({
  icon,
  source,
  disabled,
  validate,
  sx,
  ...props
}: SocialLinkProps) => {
  // const { field } = useInput(props)
  props = { ...props }

  const record = useRecordContext()

  const platform = source.includes('tiktok')
    ? platformConfig.TikTok
    : source.includes('instagram')
    ? platformConfig.Instagram
    : platformConfig.Default
  icon && (platform.icon = icon)

  const validateDomain = (url: string) => {
    if (!url.includes(platform.domain)) return `Invalid ${platform.domain} URL`
    return undefined
  }

  source.includes('tiktok') ? 'tiktok' : source
  const intialLink = source && _.get(record, source)
  const [link, setLink] = useState(intialLink)

  return (
    <Stack direction="row" alignItems={'center'} sx={sx}>
      <Box sx={{ pb: 1.75, pr: 1 }}>
        <platform.icon fontSize="large" />
      </Box>
      <TextInput
        variant="outlined"
        source={source}
        disabled={disabled}
        {...props}
        validate={[required(), validateDomain]}
        onChange={(e) => setLink(e.target.value)}
      />
      <Button
        size="large"
        sx={{
          p: 0,
          mb: 1.75,
          minWidth: '36px',
          display: disabled ? 'none' : 'block',
        }}
      >
        <LaunchIcon
          fontSize="small"
          onClick={() => window.open(link, '_blank')}
        />
      </Button>
    </Stack>
  )
}
