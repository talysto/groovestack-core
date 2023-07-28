import { useRecordContext } from 'react-admin'

export const DateField = ({
  source,
  showTime,
  label,
}: {
  source: string
  showTime?: boolean
  label?: string
}) => {
  const record = useRecordContext()
  const date = new Date(record[source])

  return (
    <span title={record[source]}>
      {showTime
        ? `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`
        : `${date.toLocaleDateString()}`}
    </span>
  )
}
