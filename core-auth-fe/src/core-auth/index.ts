import { LoginForm } from './components/login-mui/LoginForm'
import { LoginPanel } from './components/login-mui/LoginPanel'
import { SignupForm } from './components/login-mui/SignupForm'
import { SocialSignIn } from './components/login-mui/SocialSignIn'
import { RAAuth } from './react-admin'
import { Users } from './resource/users'
import { Identities } from './resource/identities'
import { defaultCredentials } from './credentials'
import { authLink } from './authLink'

export class Auth {
  static ApolloLink = authLink
  static Credentials = defaultCredentials
  static RA = RAAuth

  static Users = Users
  static Identities = Identities

  // individual components
  static LoginForm = LoginForm
  static SignupForm = SignupForm
  static SocialSignIn = SocialSignIn

  static LoginPanel = LoginPanel
}