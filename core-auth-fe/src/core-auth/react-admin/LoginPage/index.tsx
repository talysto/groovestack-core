import LockIcon from '@mui/icons-material/Lock'
import { Avatar, Card, SxProps } from '@mui/material'
import { styled } from '@mui/material/styles'
import { HtmlHTMLAttributes, ReactNode, useEffect, useRef } from 'react'
import { useCheckAuth } from 'react-admin'
import { useNavigate } from 'react-router-dom'
import { useLogin, useNotify, useSafeSetState } from 'react-admin'

import { LoginPanel } from '../../components/login-mui/LoginPanel'

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
export const LoginPage = (props: LoginPageProps) => {
  const { children, backgroundImage, ...rest } = props
  const containerRef = useRef<HTMLDivElement | null>(null)
  let backgroundImageLoaded = false
  const checkAuth = useCheckAuth()
  const navigate = useNavigate()

  // const { redirectTo, className } = props;
  const [loading, setLoading] = useSafeSetState(false)
  const login = useLogin()
  // const translate = useTranslate();
  const notify = useNotify()

  const onLogin: React.FormEventHandler<HTMLFormElement> = (e: any) => {
    e.preventDefault()
    const redirectTo = undefined

    const values = {
      email: e.target?.elements.email?.value,
      password: e.target?.elements.password?.value,
    }

    setLoading(true)
    login(values, redirectTo)
      .then(() => {
        setLoading(false)
      })
      .catch((error) => {
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
      })
  }

  useEffect(() => {
    checkAuth({}, false)
      .then(() => {
        // already authenticated, redirect to the home page
        navigate('/')
      })
      .catch(() => {
        // not authenticated, stay on the login page
      })
  }, [checkAuth, navigate])

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
  return (
    <Root {...rest} ref={containerRef}>
      <Card className={LoginClasses.card}>
        <div className={LoginClasses.avatar}>
          <Avatar className={LoginClasses.icon}>
            <LockIcon />
          </Avatar>
        </div>
        {/* {children} */}
        <LoginPanel
          social={[
            { k: 'google', href: '/users/auth/google' },
            { k: 'microsoft', href: '/users/auth/microsoft' },
            { k: 'apple', href: '/users/auth/apple' },
            { k: 'facebook', href: '/users/auth/facebook' },
          ]}
          registration={false}
          onLogin={onLogin}
          ctaDisabled={loading}
        />
      </Card>
    </Root>
  )
}

export interface LoginPageProps extends HtmlHTMLAttributes<HTMLDivElement> {
  backgroundImage?: string
  children?: ReactNode
  className?: string
  sx?: SxProps
}

const PREFIX = 'RaLogin'
export const LoginClasses = {
  card: `${PREFIX}-card`,
  avatar: `${PREFIX}-avatar`,
  icon: `${PREFIX}-icon`,
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
