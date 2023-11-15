import AppleIcon from '@mui/icons-material/Apple'
import FacebookIcon from '@mui/icons-material/Facebook'
import GoogleIcon from '@mui/icons-material/Google'
import MicrosoftIcon from '@mui/icons-material/Microsoft'
import { Box, Button } from '@mui/material'

export const standard = [
  { key: 'apple', icon: <AppleIcon />, label: 'Apple' },
  { key: 'google', icon: <GoogleIcon />, label: 'Google' },
  { key: 'microsoft', icon: <MicrosoftIcon />, label: 'Microsoft' },
  { key: 'facebook', icon: <FacebookIcon />, label: 'Facebook' },
]

type SocialType = { k: string; href?: string }
type SocialSignInRenderButton = ({ key, icon, label, href }: { key: string; icon: JSX.Element, label: string, href?: string }) => JSX.Element

export interface SocialSignInProps {
  renderButton?: SocialSignInRenderButton
  social?: SocialType[]
}



export const SocialSignIn = ({ renderButton, social }: SocialSignInProps) => {
  if (!social || social.length == 0) return null 

  return (
    <Box
      sx={{
        mt: 'auto',
        p: 3,
        display: 'flex',
        justifyContent: 'space-between',
        columnGap: 1,
        rowGap: 2,
        flexWrap: 'wrap',
        '& > *': { width: '48%' },
      }}
    >
      {social.map(({ k, href }) => {
        const s = standard.find((s) => s.key == k)
        if (!s) return null

        const { key, icon, label } = s
        if (renderButton) return <span key={key}>{renderButton({ key, icon, label, href })}</ span>

        return <Button href={href} key={key} variant="outlined" startIcon={icon}>{label}</Button>
      })}
    </Box>
  )
}
