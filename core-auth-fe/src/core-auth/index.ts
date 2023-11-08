import { LoginForm } from './components/login-mui/LoginForm'
import { LoginPanel } from './components/login-mui/LoginPanel'
import { SignupForm } from './components/login-mui/SignupForm'
import { SocialSignIn } from './components/login-mui/SocialSignIn'
import { RAAuth } from './react-admin'
import { Users } from './resource/users'
import { Providers } from './react-admin/authProviders'
import { Identities } from './resource/identities'

export class Auth {
  static RA = RAAuth
  static Users = Users
  static Providers = Providers
  static Identities = Identities

  // individual components
  static LoginForm = LoginForm
  static SignupForm = SignupForm
  static SocialSignIn = SocialSignIn

  static LoginPanel = LoginPanel
}