import WebhookIcon from '@mui/icons-material/Webhook'
import { ListGuesser, ShowGuesser } from 'react-admin'
import { WebhookTable } from './TableList'
import { WebhookShow } from './show'

export class Webhooks {
  // static Name = 'Webhook'
  // static Icon = WebhookIcon
  // static List = ListGuesser
  // static Show = ShowGuesser

  static Name = 'Webhook'
  static Icon = WebhookIcon
  static List = WebhookTable
  static Show = WebhookShow
}
