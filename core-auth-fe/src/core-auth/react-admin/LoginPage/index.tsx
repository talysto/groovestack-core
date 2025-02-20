import LockIcon from '@mui/icons-material/Lock'
import { Avatar, Box, Button, Card, Input, SxProps } from '@mui/material'
import { styled } from '@mui/material/styles'
import { HtmlHTMLAttributes, useEffect, useRef, useState } from 'react'
import { useAuthProvider, useCheckAuth } from 'react-admin'
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import { useLogin, useNotify, useSafeSetState } from 'react-admin'

import { LoginPanel } from '../../components/login-mui/LoginPanel'
import { SocialSignInProps } from '../../components/login-mui/SocialSignIn'
import { LoginCredentials, RegistrationCredentials } from '../authProviders/liveFactory'
import { Credentials, defaultCredentials } from '../../credentials'
/**
 * A standalone login page, to serve as authentication gate to the admin
 *
 * Expects the user to enter a login and a password, which will be checked
 * by the `authProvider.login()` method. Redirects to the root page (/)
 * upon success, otherwise displays an authentication error message.
 *
 * Copy and adapt this component to implement your own login logic
 * (e.g. to authenticate via email or facebook or anything else).
 *
 * @example
 *     import MyLoginPage from './MyLoginPage';
 *     const App = () => (
 *         <Admin loginPage={MyLoginPage} authProvider={authProvider}>
 *             ...
 *        </Admin>
 *     );
 */

export const csrfToken = () => {
  const meta: any = document.querySelector('meta[name=csrf-token]');
  return meta && meta.content;
};

const AppInitHeadline = () => {
  return (
    <Box sx={{ p: 3 }}>
      <div>There are currently no registered users on your application.</div>
      <div>Be the first!</div>
    </Box>
  )
}

const useHandleServerURLParams = () => {
  const [serverURLParamsHandled, setServerURLParamsHandled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    // This is required for a few reasons:
    //  1. Server side origin urls will not include hashed paths b/c HTTP_REFERRER 
    //     does not include the hash.
    //  2. RA uses react router dom HashRouter by default. Side effect of this
    //     is that any server redirects that include url params will result 
    //     in a path like: /?omniauth_failure_error=Invalid+credentials#/login.
    //  3. React router dom useSearchParams hook only parses url params that exist
    //     after the hash, so we need to extract the server url params and append

    const serverUrlParams = new URLSearchParams(window.location.search)
    const feUrlParams = new URLSearchParams(location.search)

    if (serverUrlParams.size > 0){
      let href = window.location.href.replace(`?${serverUrlParams.toString()}`, "")

      // append server url params
      if (feUrlParams.size > 0) href += `&${serverUrlParams.toString()}`
      else href += `?${serverUrlParams.toString()}`
      window.location.href = href
    }

    setServerURLParamsHandled(true)
  }, [])

  return serverURLParamsHandled
}

type OauthProvider = {
  k: string;
  path: string;
}

export const LoginPage = (props: LoginPageProps) => {
  const serverURLParamsHandled = useHandleServerURLParams()

  const [socials, setSocials] = useState<SocialSignInProps['social']>([])
  const [providers, setProviders] = useState<string[]>([])
  let { backgroundImage, credentials = defaultCredentials, Headline,  ...rest } = props
  const containerRef = useRef<HTMLDivElement | null>(null)
  let backgroundImageLoaded = false
  const checkAuth = useCheckAuth()
  const navigate = useNavigate()
  const authProvider = useAuthProvider()
  const [searchParams, setSearchParams] = useSearchParams();

  // const { redirectTo, className } = props;
  const [loading, setLoading] = useSafeSetState(false)
  const login = useLogin()
  // const translate = useTranslate();
  const notify = useNotify()

  const notifyOmniauthFailureError = () => {
    const omniauthFailureErr = searchParams.get('omniauth_failure_error')
    if (omniauthFailureErr) {
      searchParams.delete('omniauth_failure_error')
      setSearchParams(searchParams)
      notify(`Authentication Failure: ${omniauthFailureErr}`, { type: 'error' })
    }
  }

  const onLogin: React.FormEventHandler<HTMLFormElement> = async (e: any) => {
    e.preventDefault()

    const values: LoginCredentials = {
      email: e.target?.elements.email?.value,
      password: e.target?.elements.password?.value,
    }

    setLoading(true)
    try {
      await login(values)
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
        notify(
          typeof error === 'string'
            ? error
            : typeof error === 'undefined' || !error.message
            ? 'ra.auth.sign_in_error'
            : error.message,
          {
            type: 'error',
            messageArgs: {
              _:
                typeof error === 'string'
                  ? error
                  : error && error.message
                  ? error.message
                  : undefined,
            },
          },
        )
    }
  }

  const onRegister: React.FormEventHandler<HTMLFormElement> = async (e: any) => {
    e.preventDefault()

    setLoading(true)

    const values: RegistrationCredentials = {
      email: e.target?.elements.email?.value,
      password: e.target?.elements.password?.value,
      name: e.target?.elements.fullname?.value,
    }

    try {
      await authProvider.register(values)
      await login({email: values.email, password: values.password})
    } catch(error: any) {
      notify(
        typeof error === 'string'
          ? error
          : error?.message || 'Error registering',
        {
          type: 'error',
          messageArgs: {
            _:
              typeof error === 'string'
                ? error
                : error && error.message
                ? error.message
                : undefined,
          },
        },
      )
    }

    setLoading(false)
  }

  const socialSignInRender: SocialSignInProps['renderButton'] = ({ key, icon, label, href, btnSx }) => {
    return (
      <Box
        component="form"
        method='post'
        action={href}
      >
        <Input type='hidden' name='authenticity_token' value={csrfToken()} />
        <Button sx={btnSx} type='submit' variant="outlined" startIcon={icon}>{label}</Button>
      </Box>
    )
  }

  useEffect(() => {
    if (!serverURLParamsHandled) return

    checkAuth({}, false)
      .then(() => {
        // already authenticated, redirect to the home page
        navigate('/')
      })
      .catch(() => {
        // not authenticated, stay on the login page
      })
  }, [serverURLParamsHandled, checkAuth, navigate])

  const updateBackgroundImage = () => {
    if (!backgroundImageLoaded && containerRef.current) {
      containerRef.current.style.backgroundImage = `url(${backgroundImage})`
      backgroundImageLoaded = true
    }
  }

  // Load background image asynchronously to speed up time to interactive
  const lazyLoadBackgroundImage = () => {
    if (backgroundImage) {
      const img = new Image()
      img.onload = updateBackgroundImage
      img.src = backgroundImage
    }
  }

  useEffect(() => {
    if (!backgroundImageLoaded) {
      lazyLoadBackgroundImage()
    }
  })

  useEffect(() => {
    const appConfig = credentials.getAppConfig()
    const social = appConfig?.oauth_providers?.configured.map((p: OauthProvider) => {
      const { k, path: href } = p
      return { k, href }
    })
    setSocials(social || [])

    const providers = appConfig?.auth_providers?.configured.map((p: OauthProvider) => p.k)
    setProviders(providers || [])
  }, [])

  useEffect(notifyOmniauthFailureError, [serverURLParamsHandled])

  if (!serverURLParamsHandled) return null

  return (
    <Root {...rest} ref={containerRef}>
      <Card className={LoginClasses.card}>
        {Headline ? (
          <Headline />
        ) : (
          <>
            <div className={LoginClasses.avatar}>
              <Avatar className={LoginClasses.icon}>
                <LockIcon />
              </Avatar>
            </div>
            {
              !credentials.getAppConfig()?.has_admins && <AppInitHeadline />
            }
          </>
        )}
        <LoginPanel
          social={socials}
          socialSignInRender={socialSignInRender}
          providers={providers}
          onLogin={onLogin}
          onRegister={onRegister}
          registration={true}
          login={credentials.getAppConfig()?.has_admins}
          ctaDisabled={loading}
        />
      </Card>
    </Root>
  )
}

export interface LoginPageProps extends HtmlHTMLAttributes<HTMLDivElement> {
  backgroundImage?: string
  className?: string
  credentials?: Credentials
  Headline?: React.FC
  sx?: SxProps
}

const PREFIX = 'RaLogin'
export const LoginClasses = {
  card: `${PREFIX}-card`,
  avatar: `${PREFIX}-avatar`,
  icon: `${PREFIX}-icon`
}

const Root = styled('div', {
  name: PREFIX,
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  height: '1px',
  alignItems: 'center',
  justifyContent: 'flex-start',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundImage:
    'radial-gradient(circle at 50% 14em, #313264 0%, #00023b 60%, #00023b 100%)',

  [`& .${LoginClasses.card}`]: {
    minWidth: 300,
    marginTop: '6em',
  },
  [`& .${LoginClasses.avatar}`]: {
    margin: '1em',
    display: 'flex',
    justifyContent: 'center',
  },
  [`& .${LoginClasses.icon}`]: {
    // backgroundColor: theme.palette.secondary[500],
    backgroundColor: theme.palette.secondary.dark
  },
}))
