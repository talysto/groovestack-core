import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck'

import { RaRecord } from 'react-admin'
import { EditJob } from './edit'
import { JobsList } from './JobsList'

export class Jobs {
  static Name = 'Job'
  static List = JobsList
  static Edit = EditJob
  static Icon = PlaylistAddCheckIcon
  static resourceRepresentation = (job: RaRecord) =>
    `${job.type} [${job.status}]`
}
