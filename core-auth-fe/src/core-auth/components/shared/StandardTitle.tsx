import { useRecordContext } from 'react-admin'

export const StandardTitle = () => {
  const record = useRecordContext()
  if (!record) return null
  return <>{record.name}</>
}
