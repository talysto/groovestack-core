import AppleIcon from '@mui/icons-material/Apple'
import FacebookIcon from '@mui/icons-material/Facebook'
import GoogleIcon from '@mui/icons-material/Google'
import MicrosoftIcon from '@mui/icons-material/Microsoft'
import { Box, Button } from '@mui/material'

const standard = [
  { key: 'apple', icon: <AppleIcon />, label: 'Apple' },
  { key: 'google', icon: <GoogleIcon />, label: 'Google' },
  { key: 'microsoft', icon: <MicrosoftIcon />, label: 'Microsoft' },
  { key: 'facebook', icon: <FacebookIcon />, label: 'Facebook' },
]

export interface SocialSignInProps {
  social?: { k: string; href?: string }[]
}

export const SocialSignIn = ({ social }: SocialSignInProps) => {
  const socialKeys = social?.map((s) => s.k)

  return (
    <Box
      sx={{
        p: 3,
        display: 'flex',
        justifyContent: 'space-between',
        columnGap: 1,
        rowGap: 2,
        flexWrap: 'wrap',
        '& > *': { width: '48%' },
      }}
    >
      {standard.map((s) => {
        const href = social?.find(
          (requestedSocial) => requestedSocial.k == s.key,
        )?.href

        return !socialKeys || socialKeys?.includes(s.key) ? (
          <Button href={href} key={s.key} variant="outlined" startIcon={s.icon}>
            {s.label}
          </Button>
        ) : (
          <></>
        )
      })}
    </Box>
  )
}
