import WebhookIcon from '@mui/icons-material/Webhook'
import { WebhookTable } from './TableList'
import { WebhookShow } from './show'
import { RaRecord } from 'react-admin'

export class Webhooks {
  static Name = 'Webhook'
  static Icon = WebhookIcon
  static List = WebhookTable
  static Show = WebhookShow
  static recordRepresentation = (webhook: RaRecord ) => `${webhook.source} / ${webhook.event}`
}
