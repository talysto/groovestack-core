import { InputProps, TextInput, useInput } from 'react-admin';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LaunchIcon from '@mui/icons-material/Launch';
import { Box, Stack } from '@mui/material';
import React from 'react';

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
};

export interface SocialLinkProps extends InputProps {
  platform: SocialMediaPlatform;
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
export const SocialLinkInput = ({
  platform,
  ...props
}: SocialLinkProps) => {
  const { field } = useInput(props);
  const IconComponent = SocialMediaIcons[platform];

  if (!IconComponent) {
    console.error(`No icon found for platform: ${platform}`);
    return null;
  }

  return (
    <Stack direction='row' alignItems='center'>
      <Box sx={{ pb: 1, pr: 1 }}>
        <IconComponent fontSize='large' />
      </Box>
      <TextInput {...props} />
      <LaunchIcon/>
    </Stack>
  );
};
