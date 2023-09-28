import { Box, Typography } from '@mui/material'
import { useSubscribeToRecord } from '@react-admin/ra-realtime'
import { JSXElementConstructor, ReactElement, cloneElement } from 'react'
import { ShowProps, useDataProvider, useShowController } from 'react-admin'

export const JobReportShow = (
  props: ShowProps & {
    children: ReactElement<any, string | JSXElementConstructor<any>>
  },
) => {
  const dataProvider = useDataProvider()
  const { refetch, record } = useShowController({
    resource: 'JobReport',
    id: props.id,
    queryOptions: {
      staleTime: 0, // disable cache
    }
  })

  const handleEventReceived = (e: any) => {
    console.log(`event received for ${props.id}`, e)
    refetch()
  }

  const enabled = !!Object.assign({}, dataProvider)?.subscribe
  useSubscribeToRecord(handleEventReceived, 'JobReport', props.id, { enabled })

  return (
    <Box>
      {props.title && (
        <Typography variant="h6" sx={{ textAlign: 'left' }}>
          {props.title}
        </Typography>
      )}
      {cloneElement(props.children, { record })}
    </Box>
  )
}
