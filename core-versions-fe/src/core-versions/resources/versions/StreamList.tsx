import {
  ReferenceManyField,
  useRecordContext,
  SingleFieldList,
} from 'react-admin'

import { Box } from '@mui/material'
import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@mui/lab'

import {
  PolymorphicReferenceField,
  DateField,
  TimeAgoField,
} from '@moonlight-labs/core-base-fe'
import { ChangesTable } from './ChangesTable'

interface NewType {
  changesDisplayed: number
}

export const VersionTimelineItem = ({ changesDisplayed }: NewType) => {
  const record = useRecordContext()
  console.log('VersionTimelineItem')

  if (!record) return null

  return (
    <TimelineItem>
      <TimelineOppositeContent
        sx={{
          m: 0,
          mt: '10px',
          pl: 0,
          flexBasis: '7em',
          flexShrink: 0,
          flexGrow: 0,
          lineHeight: 1.2,
        }}
        align="right"
        variant="body2"
        color="text.secondary"
      >
        {/* <DateField source="timestamp" showTime={false} /> */}
        <TimeAgoField source="timestamp" />
      </TimelineOppositeContent>

      <TimelineSeparator sx={{ mt: 1 }}>
        <TimelineDot />
        <TimelineConnector />
        <TimelineConnector />
      </TimelineSeparator>

      <TimelineContent
        sx={{
          py: '12px',
          px: 2,
          verticalAlign: 'top',
          flexShrink: 0,
          flexGrow: 1,
        }}
      >
        <PolymorphicReferenceField source="actor" /> changed
        <Box>
          <ChangesTable changesDisplayed={changesDisplayed} />
        </Box>
      </TimelineContent>
    </TimelineItem>
  )
}

export const VersionStream = ({
  changesDisplayed = 3,
}: {
  changesDisplayed?: number
}) => {
  const record = useRecordContext()
  return (
    <>
      <ReferenceManyField
        reference="Version"
        target="resource_id"
        record={record}
        sort={{ field: 'created_at', order: 'DESC' }}
      >
        <SingleFieldList
          sx={{ display: 'inline-block', p: 0 }}
          linkType={false}
        >
          <VersionTimelineItem changesDisplayed={changesDisplayed} />
        </SingleFieldList>
      </ReferenceManyField>
    </>
  )
}
