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

export const VersionTimelineItem = ({changesDisplayed}: {changesDisplayed: number}) => {

  const record = useRecordContext();

  if (!record) return null;
  return (

    <TimelineItem>
        <TimelineOppositeContent 
          sx={{ m: 0, mt: '10px', pl: 0  }}
          align="right"
          variant="body2"
          color="text.secondary"
        >
          <CoreDateField source="timestamp" showTime={false} />
        </TimelineOppositeContent>

      <TimelineSeparator sx={{mt:1}}>
        <TimelineDot />
        <TimelineConnector />
        <TimelineConnector />
      </TimelineSeparator>

      <TimelineContent sx={{ py: '12px', px: 2, verticalAlign: 'top' }}>
        <PolymorphicReferenceField source="actor" />
            {' '}
            changed
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 450, width: 450 }}>
          <Typography variant="body2" color="textSecondary">
            <table>
              <tbody>
                {record && record.changes && record.changes.filter((item, idx) => idx < changesDisplayed).map((change: any) => {
                  return (
                    <tr key={change[0]} style={{ verticalAlign: 'baseline' }}>
                      <td style={{ textTransform: 'uppercase', fontSize: '80%', paddingRight: 15 }}>{change[0]}</td>
                       <td> {/*  style={{inlineSize: '500px', overflowWrap: 'anywhere'}} */}
                        {change[1][1]}
                        <br />
                        (
                        <span style={{ textDecoration: 'line-through' }}>
                          {change[1][0]}
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

export const VersionStream = ({changesDisplayed = 3}: {changesDisplayed?: number} ) => {
  const record = useRecordContext()
  return (
    <>
      <ReferenceManyField
        reference="Version"
        target="resource_id"
        record={record}
        sort={{ field: 'created_at', order: 'DESC' }}
      >
        <SingleFieldList sx={{ display: 'inline-block', p:0 }} linkType={false}>
          <VersionTimelineItem changesDisplayed={changesDisplayed} />
        </SingleFieldList>
      </ReferenceManyField>
    </>
  )
}
