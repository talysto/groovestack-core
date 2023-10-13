import { Box, Typography } from '@mui/material'
import { useSubscribeToRecord } from '@react-admin/ra-realtime'
import { JSXElementConstructor, ReactElement, cloneElement, useState, useEffect } from 'react'
import { Identifier, RaRecord, ShowProps, useDataProvider, useShowController } from 'react-admin'

export const JobReportShow = (
  props: ShowProps & {
    children: ReactElement<any, string | JSXElementConstructor<any>>;
    data?: any; // if provided, skip fetch and subscription
  },
) => {
  const [data, setData] = useState<RaRecord>()
  const dataProvider = useDataProvider()

  const onSuccess = (report: any) => setData(report) 

  // initial call
  useShowController({
    resource: 'JobReport',
    id: props.id,
    queryOptions: { enabled: !props.data, onSuccess },
  })

  const handleEventReceived = ({ type, payload }: any) => { if (type != 'subscribe') setData({id: props.id as Identifier, data: payload.data}) }

  const enabled = !props.data && !!Object.assign({}, dataProvider)?.subscribe
  useSubscribeToRecord(handleEventReceived, 'JobReport', props.id, { enabled })

  useEffect(() => {
    setData(props.data)
  }, [props.data])
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
