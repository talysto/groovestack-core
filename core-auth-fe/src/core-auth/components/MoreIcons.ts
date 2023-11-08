// This file exists to create a central file for consistent naming
// of 3rd-party icons used in the project.  Currently these are all referencing
// https://styled-icons.dev/
// All of the icons packages referenced here should use tree-shaking
// so the overall bundle size should not increase too much.

// Search for more icons:
// MUI: https://mui.com/material-ui/material-icons/
// https://styled-icons.dev/

import {
  ApplePay,
  CcAmex,
  CcApplePay,
  CcDiscover,
  CcMastercard,
  CcPaypal,
  CcStripe,
  CcVisa,
  GooglePay,
} from '@styled-icons/fa-brands'

// Brand icons
import {
  Apple,
  Facebook,
  Google,
  Instagram,
  Linkedin,
  Microsoft,
  Tiktok,
  Twitter,
} from '@styled-icons/fa-brands'

import AdminIcon from '@mui/icons-material/AdminPanelSettingsTwoTone'
export class MoreIcons {
  static Stripe = CcStripe
  static Visa = CcVisa
  static Mastercard = CcMastercard
  static Amex = CcAmex
  static CcApplePay = CcApplePay
  static Discover = CcDiscover
  static Paypal = CcPaypal

  static Apple = Apple
  static ApplePay = ApplePay
  static Facebook = Facebook
  static Instagram = Instagram
  static Tiktok = Tiktok
  static Linkedin = Linkedin
  static Google = Google
  static GooglePay = GooglePay
  static Microsoft = Microsoft
  static Twitter = Twitter

  static Admin = AdminIcon
}
