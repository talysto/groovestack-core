import {
  Datagrid,
  DateField,
  DeleteWithConfirmButton,
  ReferenceManyField,
  TextField,
  WrapperField,
  useRecordContext,
} from 'react-admin'
import { PolymorphicReferenceField } from './PolymorphicReferenceField'
import { Typography, Avatar, Box } from '@mui/material'
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@mui/lab'
import { Versions } from '.'

const ActorField = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box>
        <Avatar />
      </Box>
      <Box sx={{ flexGrow: 1, m: 1 }}>
        <Typography>
          <PolymorphicReferenceField source="actor" />
        </Typography>
        <Typography>
          <DateField source="created_at" />
        </Typography>
      </Box>
    </Box>
  )
}


export const VersionTimelineItem = ({
  actor,
  changes,
  timestamp,
}: VersionProps) => {
  return (
    <TimelineItem>
      <TimelineOppositeContent
        sx={{ m: 'auto 0' }}
        align="right"
        variant="body2"
        color="text.secondary"
      >
        {timestamp}
      </TimelineOppositeContent>

      <TimelineSeparator>
        <TimelineConnector />
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>

      <TimelineContent sx={{ py: '12px', px: 2 }}>
        <Link href={actor.url} underline="hover">
          {actor.name}
        </Link>{' '}
        changed
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          {/* ALTERNATIVE This is a sentence per change version */}
          {/* {changes.map((change) => (
            <Typography
              key={change.field}
              variant="body2"
              color="textSecondary"
            >
              {change.field} from{' '}
              <span style={{ textDecoration: 'line-through' }}>
                {change.oldValue}
              </span>{' '}
              {' to '}
              {change.newValue}
            </Typography>
          ))} */}

          <Typography variant="body2" color="textSecondary">
            <table>
              <tbody>
                {changes.map((change) => (
                  <tr key={change.field}>
                    <td style={{textTransform: 'uppercase', fontSize: '80%'}}>{change.field}</td>
                    <td>
                      {change.newValue} (
                      <span style={{ textDecoration: 'line-through' }}>
                        {change.oldValue}
                      </span>
                      )
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Typography>
        </Box>
      </TimelineContent>
    </TimelineItem>
  )
}

export const ChangeTimeline = ({ changes }) => {
  // const classes = useStyles();

  return (
    <Timeline>
      {changes.map((change, idx) => (
        <VersionTimelineItem key={idx} {...change} />
      ))}
    </Timeline>
  )
}

export const VersionStream = () => {
  const record = useRecordContext()

  return (
    <>
      <ReferenceManyField
        reference="Version"
        target="resource_id"
        record={record}
      >
        <Datagrid bulkActionButtons={false}>
          <WrapperField>
            <ActorField />

            <Typography>{/* <TextField source="body" /> */}</Typography>
          </WrapperField>
          <DeleteWithConfirmButton label="" />
        </Datagrid>
      </ReferenceManyField>
    </>
  )
}
