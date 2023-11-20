import { TimeAgoField } from '@groovestack/base'
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  timelineOppositeContentClasses,
} from '@mui/lab'
import { FieldProps, useRecordContext } from 'react-admin'
import { jobStatuses } from '../../resource/jobs/jobsStatuses'

export const JobTimelineField = (props: FieldProps) => {
  const job = useRecordContext()

  return (
    <Timeline
      sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.2,
          margin: 'auto',
        },
      }}
    >
      {job.status == 'scheduled' ||
        (job.status == 'queued' && (
          <TimelineItem>
            <TimelineOppositeContent color="textSecondary">
              <TimeAgoField source="run_at" />
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot>{<JobStatusIcon status="scheduled" />}</TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ pt: 2 }}>{job.status}</TimelineContent>
          </TimelineItem>
        ))}

      {job.status == 'running' && (
        <TimelineItem>
          <TimelineOppositeContent color="textSecondary">
            Now
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot>{<JobStatusIcon status="running" />}</TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ pt: 2 }}>Running</TimelineContent>
        </TimelineItem>
      )}

      {job.error_count > 0 &&
        job.status != 'failed' &&
        job.status != 'completed' && (
          <TimelineItem>
            <TimelineOppositeContent color="textSecondary">
              <TimeAgoField source="run_at" />
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot>
                {
                  <JobStatusIcon
                    status="errored"
                    color="warning"
                    fontSize="small"
                  />
                }
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ pt: 2 }}>
              {job.error_count} Error/Retries
            </TimelineContent>
          </TimelineItem>
        )}

      {job.expired_at && (
        <TimelineItem>
          <TimelineOppositeContent color="textSecondary">
            <TimeAgoField source="expired_at" />
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot>
              {
                <JobStatusIcon
                  status="failed"
                  color="warning"
                  fontSize="small"
                />
              }
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent sx={{ pt: 2 }}>Failed</TimelineContent>
        </TimelineItem>
      )}

      {job.finished_at && (
        <TimelineItem>
          <TimelineOppositeContent color="textSecondary">
            <TimeAgoField source="finished_at" />
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="success">
              {
                <JobStatusIcon
                  status="completed"
                  color="success"
                  fontSize="small"
                />
              }
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent sx={{ pt: 2 }}>Complete</TimelineContent>
        </TimelineItem>
      )}
    </Timeline>
  )
}

const JobStatusIcon = (props: any) => {
  const StatusIcon = jobStatuses[props.status].icon
  return <StatusIcon />
}
