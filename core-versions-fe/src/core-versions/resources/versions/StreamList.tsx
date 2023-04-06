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

import { CoreBase } from '../../../../../core-base-fe/src/core-base' // TODO make core-base-fe a proper peer dep
const CoreDateField = CoreBase.CoreDateField

export const VersionTimelineItem = () => {

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
          <CoreDateField source="timestamp" showTime={true} />
        </TimelineOppositeContent>

      <TimelineSeparator>
        <TimelineConnector />
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>

      <TimelineContent sx={{ py: '12px', px: 2 }}>
        <PolymorphicReferenceField source="actor" />
            {' '}
            changed
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

export const VersionStream = () => {
  const record = useRecordContext()
  return (
    <>
      <ReferenceManyField
        reference="Version"
        target="item_id"
        record={record}
        sort={{ field: 'created_at', order: 'DESC' }}
      >
        <SingleFieldList sx={{ display: 'inline-block' }} linkType={false}>
          <VersionTimelineItem />
        </SingleFieldList>
      </ReferenceManyField>
    </>
  )
}
