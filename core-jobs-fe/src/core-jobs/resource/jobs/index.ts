import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck'

import { RaRecord } from 'react-admin'
import { JobsList } from './JobsList'
import { EditJob } from './edit'

export class Jobs {
  static Name = 'Job'
  static List = JobsList
  static Edit = EditJob
  static Icon = PlaylistAddCheckIcon
  static resourceRepresentation = (job: RaRecord) =>
    `${job.job_class} ${job.sub_class} [${job.status}]`
}
