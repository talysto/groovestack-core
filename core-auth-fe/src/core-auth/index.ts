import { LoginForm } from './components/login-mui/LoginForm'
import { LoginPanel } from './components/login-mui/LoginPanel'
import { SignupForm } from './components/login-mui/SignupForm'
import { SocialSignIn } from './components/login-mui/SocialSignIn'
import { RAAuth } from './react-admin'

export class Auth {
  static RA = RAAuth

  // individual components
  static LoginForm = LoginForm
  static SignupForm = SignupForm
  static SocialSignIn = SocialSignIn

  static LoginPanel = LoginPanel
}