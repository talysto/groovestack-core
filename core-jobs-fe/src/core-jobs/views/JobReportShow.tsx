import { Box, Typography } from '@mui/material'
import { JSXElementConstructor, ReactElement, cloneElement, useState, useEffect } from 'react'
import { Identifier, RaRecord, ShowProps, useShowController } from 'react-admin'
import { useSubscription } from '@apollo/client'
import { SUBSCRIBE_TO_JOB_REPORT } from '../gql'

export const JobReportShow = (
  props: ShowProps & {
    children: ReactElement<any, string | JSXElementConstructor<any>>;
    data?: any; // if provided, skip fetch and subscription
  },
) => {
  const [data, setData] = useState<RaRecord>()

  const onSuccess = (report: any) => setData(report) 

  // initial call
  useShowController({
    resource: 'JobReport',
    id: props.id,
    queryOptions: { enabled: !props.data, onSuccess },
  })

  const { data: subscriptionData } = useSubscription(SUBSCRIBE_TO_JOB_REPORT, { variables: { id: props.id } })

  useEffect(() => {
    setData(props.data)
  }, [props.data])

  useEffect(() => {
    if (subscriptionData?.JobReport && subscriptionData.JobReport.event.type != 'subscribe') setData({id: props.id as Identifier, data: subscriptionData.JobReport.event.payload.data})
  }, [subscriptionData])

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
