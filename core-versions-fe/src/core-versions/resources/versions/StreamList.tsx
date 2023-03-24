import {
  Datagrid,
  DateField,
  DeleteWithConfirmButton,
  ReferenceManyField,
  TextField,
  WrapperField,
  useRecordContext,
  SingleFieldList,
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


export const VersionTimelineItem = ({ target }) => {

  const record = useRecordContext();
  // console.log("record ", record)
  console.log(target)
  if (!record) return null;
  return (
    <TimelineItem>
      <TimelineOppositeContent
        sx={{ m: 'auto 0' }}
        align="right"
        variant="body2"
        color="text.secondary"
      >
        {record.timestamp}
      </TimelineOppositeContent>

      <TimelineSeparator>
        <TimelineConnector />
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>

      <TimelineContent sx={{ py: '12px', px: 2 }}>
        {target == 'resource_id' &&
          <>
            <PolymorphicReferenceField source="actor" />
            {' '}
            changed
          </>
        }
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Typography variant="body2" color="textSecondary">
            <table>
              <tbody>
                {record.changes.map((change) => (
                  <tr key={change.field}>
                    <td style={{ textTransform: 'uppercase', fontSize: '80%' }}>{change.field}</td>
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

export const VersionStream = ({ target }) => {
  const record = useRecordContext()
  // console.log("target = ", target)
  return (
    <>
      <ReferenceManyField
        reference="Version"
        target={target}
        record={record}
      >
        <SingleFieldList sx={{ display: 'inline-block' }}>
          <VersionTimelineItem target={target} />
        </SingleFieldList>
      </ReferenceManyField>
    </>
  )
}
