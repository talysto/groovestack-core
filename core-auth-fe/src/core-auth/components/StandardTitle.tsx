import { useRecordContext, useResourceContext } from 'react-admin'

export const StandardTitle = () => {
  const record = useRecordContext()
  const resource = useResourceContext()
  
  return <>{record?.name || `${resource} ${record?.id}`}</>
}
