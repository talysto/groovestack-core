import { Box, Typography } from '@mui/material'
import { useSubscribeToRecord } from '@react-admin/ra-realtime'
import { JSXElementConstructor, ReactElement, cloneElement, useState } from 'react'
import { ShowProps, useDataProvider, useShowController } from 'react-admin'

export const JobReportShow = (
  props: ShowProps & {
    children: ReactElement<any, string | JSXElementConstructor<any>>
  },
) => {
  const [data, setData] = useState()
  const dataProvider = useDataProvider()
  
  // initial call
  useShowController({
    resource: 'JobReport',
    id: props.id,
    queryOptions: {
      onSuccess(report) {
        setData(report)
      }
    },
  })

  const handleEventReceived = ({ payload: data }: any) => setData(data)

  const enabled = !!Object.assign({}, dataProvider)?.subscribe
  useSubscribeToRecord(handleEventReceived, 'JobReport', props.id, { enabled })

  return (
    <Box>
      {props.title && (
        <Typography variant="h6" sx={{ textAlign: 'left' }}>
          {props.title}
        </Typography>
      )}
      {cloneElement(props.children, { record: data })}
    </Box>
  )
}
