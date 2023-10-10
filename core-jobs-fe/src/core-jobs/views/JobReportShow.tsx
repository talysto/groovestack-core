import { Box, Typography } from '@mui/material'
import { useSubscribeToRecord } from '@react-admin/ra-realtime'
import { JSXElementConstructor, ReactElement, cloneElement, useState } from 'react'
import { ShowProps, useDataProvider, useShowController } from 'react-admin'

export const JobReportShow = (
  props: ShowProps & {
    children: ReactElement<any, string | JSXElementConstructor<any>>;
    data?: any; // if provided, skip fetch and subscription
  },
) => {
  const [data, setData] = useState()
  const dataProvider = useDataProvider()

  // initial call
  useShowController({
    resource: 'JobReport',
    id: props.id,
    queryOptions: { enabled: !props.data, onSuccess(report) { setData(report) } },
  })

  const handleEventReceived = ({ type, payload: data }: any) => { if (type != 'subscribe') setData(data) }

  const enabled = !props.data && !!Object.assign({}, dataProvider)?.subscribe
  useSubscribeToRecord(handleEventReceived, 'JobReport', props.id, { enabled })

  return (
    <Box>
      {props.title && (
        <Typography variant="h6" sx={{ textAlign: 'left' }}>
          {props.title}
        </Typography>
      )}
      {cloneElement(props.children, { record: data || props.data })}
    </Box>
  )
}
