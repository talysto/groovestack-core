import AppleIcon from '@mui/icons-material/Apple'
import FacebookIcon from '@mui/icons-material/Facebook'
import GoogleIcon from '@mui/icons-material/Google'
import MicrosoftIcon from '@mui/icons-material/Microsoft'
import { Box, Button, SxProps } from '@mui/material'

type SocialStandardType = { key: string; icon: JSX.Element; label: string }

export const standard: SocialStandardType[] = [
  { key: 'apple', icon: <AppleIcon />, label: 'Apple' },
  { key: 'google', icon: <GoogleIcon />, label: 'Google' },
  { key: 'microsoft', icon: <MicrosoftIcon />, label: 'Microsoft' },
  { key: 'facebook', icon: <FacebookIcon />, label: 'Facebook' },
]

type SocialsPropType = { k: string; href?: string }
type SocialSignInRenderButton = ({ key, icon, label, href, disabled, btnSx }: { key: string; icon: JSX.Element, label: string, href?: string, disabled?: boolean, btnSx?: SxProps }) => JSX.Element

export interface SocialSignInProps {
  mode?: SocialSignInMode
  renderButton?: SocialSignInRenderButton
  social?: SocialsPropType[]
}

export enum SocialSignInMode {
  Footer = 'footer',
  Main = 'main',
}

type SocialType = SocialsPropType & { standard: SocialStandardType }

export const SocialSignIn = ({ renderButton, social, mode=SocialSignInMode.Main }: SocialSignInProps) => {
  if (!social || social.length == 0) return null 

  const socials: SocialType[] = social.map((socialProp) => {
    const s = standard.find((s) => s.key == socialProp.k)
    if(!s) return null 

    const social: SocialType = { 
      ...socialProp,
      standard: s
    }
     
    return social
  }).filter(Boolean) as SocialType[]

  const btnSx = mode == SocialSignInMode.Main ? { width: '100%' } : {}

  const renderSocials = () => {
    return (
      <>
        {socials.map(({ _k, href, standard }) => {
          const { key, icon, label } = standard
          
          if (renderButton) return <span key={key}>{renderButton({ key, icon, label, href, btnSx })}</ span>

          return <Button sx={btnSx} href={href} key={key} variant="outlined" startIcon={icon}>{label}</Button>
        })}
      </>
    )
  }

  if (mode == SocialSignInMode.Footer)
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
        {renderSocials()}
      </Box>
    )

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 3,
        rowGap: 2,
      }}
    >
      {renderSocials()}
    </Box>
  )
}
