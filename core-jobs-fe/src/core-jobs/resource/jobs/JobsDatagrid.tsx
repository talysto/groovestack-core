import { useMediaQuery, useTheme } from '@mui/material'

import { CustomButtonDrawer, DrawerWidth, TimeAgoField } from '@moonlight-labs/core-base-fe'
import {
  Datagrid,
  FunctionField,
  NumberField,
  RowClickFunction,
  TextField,
} from 'react-admin'
import { JobStatusField } from '../../react-admin/fields/JobStatusField'
import { JobActions } from './JobActions'
import { EditJob } from './edit'

const triggerDrawer: RowClickFunction = (props) => {
  alert(`TODO: open the drawer.`)
  return false
}

export const JobDatagrid = () => {
  const theme = useTheme()
  const moreThanSmall = useMediaQuery(theme.breakpoints.up('sm'))
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
            <div>{record.sub_class}</div>
            <small style={{ marginRight: 5 }} title={record.id}>
              {record.id.substring(0, 6)}
            </small>
          </div>
        )}
      />

      {moreThanSmall && <TextField source="queue" sortable={false} />}
      {moreThanSmall && <NumberField source="priority" />}

      <JobStatusField source="status" />

      <TimeAgoField label="Scheduled" source="run_at" />
      <JobActions label="Actions" />
      {/* <CustomButtonDrawer
        label=" "
        drawerProps={{ title: 'Edit Jobs' }}
        // sx={{ display: 'inline-flex' }}
        mode="edit"
        drawerWidth={DrawerWidth.Medium}
        clickableComponent={<ListItem>View</ListItem>}
      >
        <EditJob />
      </CustomButtonDrawer> */}
    </Datagrid>
  )
}
