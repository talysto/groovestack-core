import { JSXElementConstructor, ReactElement, cloneElement } from 'react'
import { ShowProps, useDataProvider, useShowController } from 'react-admin'

// import { ShowLive } from '@react-admin/ra-realtime'
// const ReactAdminRealtime = await import('@react-admin/ra-realtime')

// ( async function() {
import  {useSubscribeToRecord} from '@react-admin/ra-realtime'
// })()

// export const JobReportChart = ({
//   title,
//   filter,
//   children,
// }: {
//   title: string
//   filter: any
//   children: any
// }) => {
//   // const dataProvider = useDataProvider()
//   // debugger

//   // console.log('has subscribe', typeof dataProvider['subscribe'] === 'function')
//   // const ListComponent =  (typeof dataProvider['subscribe'] === 'function') ? ReactAdminRealtime.ListLive : ListBase
//   const ListComponent = ListBase

//   return (
//     <ListComponent
//       // <ListBase
//       resource="JobReport"
//       filter={filter}
//       exporter={false}
//       disableSyncWithLocation
//       perPage={100}
//     >
//       <Stack sx={{ textAlign: 'left' }}>
//         {title && <Typography variant="h6">{title}</Typography>}
//         {children}
//       </Stack>
//     </ListComponent>
//   )
// }

export const JobReportShow = (
  props: ShowProps & {
    children: ReactElement<any, string | JSXElementConstructor<any>>
  },
) => {
  const dataProvider = useDataProvider()
  const { refetch, record } = useShowController({
    resource: 'JobReport',
    id: props.id,
  })

  const handleEventReceived = (e: any) => {
    console.log('event received', e)
    refetch()
  }

  const enabled = !!Object.assign({}, dataProvider)?.subscribe
  useSubscribeToRecord(
    handleEventReceived,
    'JobReport',
    props.id,
    { enabled },
  )

  return <>{cloneElement(props.children, { record })}</>
}
