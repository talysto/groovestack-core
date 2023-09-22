import { Chip, CircularProgress } from '@mui/material';
import {
  Datagrid, FunctionField, NumberField,
  RaRecord, TextField
} from 'react-admin';
import { TimeAgoField } from '@moonlight-labs/core-base-fe';
import { JobActions } from './JobsList';

export const JobDatagrid = () => (
  <Datagrid sort={{ field: 'priority', order: 'ASC' }} >
    <FunctionField
      label="Job"
      render={(record: any) => (
        <div>
          <div>{record.type}</div>
          <small style={{ marginRight: 5 }} title={record.id}>
            {record.id.substring(0, 6)}
          </small>
        </div>
      )} />

    <TextField source="queue" sortable={false} />
    <NumberField source="priority" />
    <FunctionField label="Status" render={enhancedStatus} />

    <TimeAgoField label="Scheduled" source="run_at" />
    <JobActions label="" />
  </Datagrid>
);

const enhancedStatus = (record: RaRecord) => {
  // var extended = null;
  const runningIcon = <CircularProgress size="0.75em" />;

  const statusMap: { [key: string]: JSX.Element; } = {
    running: <Chip label={'Running'} size="small" icon={runningIcon} />,
    failed: (
      <Chip label={'Failed'} variant="outlined" color="error" size="small" />
    ),
    error: <Chip label={`Error/Retry`} variant="outlined" size="small" />,
    scheduled: <Chip label={'Scheduled'} size="small" />,
    queued: <Chip label={'Queued'} size="small" />,
    complete: <Chip label={'Complete'} size="small" />,
  };

  return statusMap[record.status] || <Chip label={record.status} size="small" />;
};
