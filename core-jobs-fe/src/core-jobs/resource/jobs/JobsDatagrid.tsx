import { useMediaQuery, useTheme } from '@mui/material'

import { TimeAgoField } from '@moonlight-labs/core-base-fe'
import {
  Datagrid,
  FunctionField,
  NumberField,
  TextField,
} from 'react-admin'
import { JobStatusField } from '../../react-admin/fields/JobStatusField'
import { JobActions } from './JobActions'


const rowClick = (event: React.MouseEvent<HTMLElement>) => {

  // TODO Resolve this warning
  // @ts-ignore-line
  const tr = event.target.closest('tr')
  if(!tr) return false

  tr.querySelector('button[aria-label="view"]')?.click()
  return false
}

export const JobDatagrid = () => {
  const theme = useTheme()
  const moreThanSmall = useMediaQuery(theme.breakpoints.up('sm'))
  return (
    <Datagrid
      onClick={rowClick}
      // rowClick='tFunc'
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
