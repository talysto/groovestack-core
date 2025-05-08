import { Box, Typography } from '@mui/material'
import { JSXElementConstructor, ReactElement, cloneElement, useState, useEffect, createContext, useContext } from 'react'
import { Identifier, RaRecord, ShowProps, useShowController } from 'react-admin'
import { useSubscription } from '@apollo/client'
import { SUBSCRIBE_TO_JOB_REPORT } from '../gql'
import { ApolloSubscriptionProvider } from '../components/ApolloSubscriptionProvider'
import { useApolloContext } from '../hooks/useApolloContext'

export const JobReportContext = createContext<any|undefined>(undefined)

const JobReportContextProvider = ({ children, id, data }: { children: React.ReactNode, id: string, data?: any }) => {
  const [reportData, setReportData] = useState<RaRecord>()
  const { enabled: apolloEnabled } = useApolloContext()

  // initial call
  useShowController({
    resource: 'JobReport',
    id,
    queryOptions: { enabled: !data, onSuccess(report) { setReportData(report) } },
  })
  
  const updateJobReport = (subscriptionData: any) => {
    if (subscriptionData?.JobReport && subscriptionData.JobReport.event.type != 'subscribe') setReportData({id, data: subscriptionData.JobReport.event.payload.data})
  }

  if (apolloEnabled) return (
    <ApolloSubscriptionProvider 
      Context={JobReportContext} 
      value={reportData} 
      updateValue={updateJobReport}
      subscription={SUBSCRIBE_TO_JOB_REPORT}
      variables={{ id }}
    >
      {children}
    </ApolloSubscriptionProvider>
  )

  return (
    <JobReportContext.Provider value={reportData}>
      {children}
    </JobReportContext.Provider>
  )
}

const JobReportContextConsumer = ({ children }: { children: ReactElement<any, string | JSXElementConstructor<any>> }) => {
  const data = useContext(JobReportContext)
  
  return (
    cloneElement(children, { record: data })
  )
}

interface JobReportShowProps extends ShowProps {
  children: ReactElement<any, string | JSXElementConstructor<any>>;
  data?: any; // if provided, skip fetch and subscription
}

export const JobReportShow = (props: JobReportShowProps) => {
  return (
    <Box>
      {props.title && (
        <Typography variant="h6" sx={{ textAlign: 'left' }}>
          {props.title}
        </Typography>
      )}
      <JobReportContextProvider id={props.id} data={props.data}>
        <JobReportContextConsumer>
          {props.children}
        </JobReportContextConsumer>
      </JobReportContextProvider>
    </Box>
  )
}
