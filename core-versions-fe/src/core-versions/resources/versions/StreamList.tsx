import React from 'react'
import {
  ReferenceManyField,
  useRecordContext,
  SingleFieldList,
} from 'react-admin'
import { PolymorphicReferenceField } from './PolymorphicReferenceField'
import { Typography, Box } from '@mui/material'
import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@mui/lab'

export const VersionTimelineItem = ({ target }) => {

  const record = useRecordContext();

  if (!record) return null;
  return (
    <TimelineItem>
        <TimelineOppositeContent 
          sx={{ m: 'auto 0', padding: 'none', margin: 'none' }}
          align="right"
          variant="body2"
          color="text.secondary"
        >
          {record && record.timestamp}
        </TimelineOppositeContent>

      <TimelineSeparator>
        <TimelineConnector />
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>

      <TimelineContent sx={{ py: '12px', px: 2 }}>
        {target == 'item_id' &&
          <>
            <PolymorphicReferenceField source="item" />
            {' '}
            changed
          </>
        }
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 250, width: 250 }}>
          <Typography variant="body2" color="textSecondary">
            <table>
              <tbody>
                {record && record.changes && record.changes.map((change: any) => {
                  return (
                    <tr key={change[0]}>
                      <td style={{ textTransform: 'uppercase', fontSize: '80%' }}>{change[0]}</td>
                      <td>
                        {change[0].includes('password') || change[0].includes('token') || change[0].includes('id')  ? '***' : change[1][1]} 
                        <br />
                        (
                        <span style={{ textDecoration: 'line-through' }}>
                          {change[0].includes('password') || change[0].includes('token') || change[0].includes('id') ? '**' : change[1][0]}
                        </span>
                        )
                      </td>
                    </tr>
                  )
                })}
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
