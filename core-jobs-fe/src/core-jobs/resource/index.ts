import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck'

import { EditJob } from './edit'
import { Table } from './table'

export class Jobs {
  static Name = 'Job'
  static List = Table
  static Edit = EditJob
  // static Show = ShowSession
  static Icon = PlaylistAddCheckIcon
}
