import {
  Datagrid,
  InfiniteList,
  useRecordContext,
  TextField,
  List,
  SingleFieldList
} from 'react-admin'

import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@mui/lab'
import { Box } from '@mui/material'

import {
  PolymorphicReferenceField,
  TimeAgoField,
} from '@moonlight-labs/core-base-fe'
import { ChangesTable } from './ChangesTable'


// TODO: Make sure Comment & Version scopes are namespaced
interface NewType {
  changesDisplayed: number
}

export const VersionTimelineItem = ({ changesDisplayed }: NewType) => {
  const record = useRecordContext()

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

  if(!record) return 'Emtpy..'

  console.log('Record: ', record.id)

  return (
    <InfiniteList
      resource="Version"
      filter={record ? { resource_id: record.id } : {}}
      sort={{ field: 'created_at', order: 'DESC' }}
      actions={false}
    >
      {/* <Datagrid>
        <TextField source="id" />
      </Datagrid> */}
        <SingleFieldList
          sx={{ display: 'inline-block', p: 0 }}
          linkType={false}
        >
          <VersionTimelineItem changesDisplayed={changesDisplayed} />
        </SingleFieldList>
    </InfiniteList>
  )
}
