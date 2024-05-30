import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import LaunchIcon from '@mui/icons-material/Launch'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import { Box, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { InputProps, TextInput, useInput, useRecordContext } from 'react-admin'

export enum SocialMediaPlatform {
  Instagram = 'Instagram',
  Facebook = 'Facebook',
  Twitter = 'Twitter',
  LinkedIn = 'LinkedIn',
}
const SocialMediaIcons = {
  [SocialMediaPlatform.Instagram]: InstagramIcon,
  [SocialMediaPlatform.Facebook]: FacebookIcon,
  [SocialMediaPlatform.Twitter]: TwitterIcon,
  [SocialMediaPlatform.LinkedIn]: LinkedInIcon,
}

export interface SocialLinkProps extends InputProps {
  platform: SocialMediaPlatform
}

/**
 * SocialLinkInput is a React Admin Input that formats a rating value as a MUI rating component.
 *
 * FEATURES
 * - Standard React Admin Input property interface
 * - The ability to pass MUI Rating component props via 'componentProps'
 *
 * NOTES
 * - Rating Input allows people to share their opinions on something.
 */
export const SocialLinkInput = ({ platform, ...props }: SocialLinkProps) => {
  // const { field } = useInput(props)
  const IconComponent = SocialMediaIcons[platform]
  const record = useRecordContext()
  const [link, setLink] = useState(record.instagram_url) //TODO use lodash to drill down and get the correct platform on intial load

  useEffect(() => {
    console.log('link', link)
  }, [link])

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
        onChange={(e) =>
          setLink(e.target.value)
        }
      />
      <Box sx={{ pb: 1.5, pl: 1 }}>
        <LaunchIcon fontSize="small"
        onClick={() => window.open(link, '_blank')}
        />
      </Box>
    </Stack>
  )
}
