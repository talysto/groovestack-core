import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck'

import { RaRecord } from 'react-admin'
import { EditJob } from './edit'
import { Table } from './JobsTable'

export class Jobs {
  static Name = 'Job'
  static List = Table
  static Edit = EditJob
  // static Show = ShowSession
  static Icon = PlaylistAddCheckIcon
  static resourceRepresentation = (job: RaRecord) =>
    `${job.type} [${job.status}]`
}
