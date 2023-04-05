import React from 'react'
import { useRecordContext } from 'react-admin'

export const CoreDateField: React.FC<{ source: string; showTime: boolean }> = ({
  source, showTime
}) => {
  const record = useRecordContext()
  const date = new Date(record[source])

  return (
    <span title={record[source]}>
      {showTime ? `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}` : `${date.toLocaleDateString()}`}
    </span>
  )
}
