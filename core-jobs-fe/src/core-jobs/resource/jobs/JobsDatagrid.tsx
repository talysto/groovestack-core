import { useTheme } from '@mui/material'

import { TimeAgoField } from '@moonlight-labs/core-base-fe'
import {
  Datagrid,
  FunctionField,
  NumberField,
  RowClickFunction,
  TextField,
} from 'react-admin'
import { JobStatusField } from '../../react-admin/fields/JobStatusField'
import { JobActions } from './JobActions'

const triggerDrawer: RowClickFunction = (props) => {
  alert(`TODO: open the drawer.`)
  return false
}

export const JobDatagrid = () => {
  const theme = useTheme()
  // const moreThanSmall = useMediaQuery(theme.breakpoints.up('sm'))
  return (
    <Datagrid
      // rowClick={triggerDrawer}
      //  bulkActionButtons={!moreThanSmall && false}
      sort={{ field: 'priority', order: 'ASC' }}
    >
      <FunctionField
        label="Job"
        render={(record: any) => (
          <div>
            <div>{record.type}</div>
            <small style={{ marginRight: 5 }} title={record.id}>
              {record.id.substring(0, 6)}
            </small>
          </div>
        )}
      />

      <TextField source="queue" sortable={false} />
      {/* {moreThanSmall && <NumberField source="priority" />} */}
      <NumberField source="priority" />

      <JobStatusField source="status" />

      <TimeAgoField label="Scheduled" source="run_at" />
      <JobActions label="Actions" />
    </Datagrid>
  )
}
