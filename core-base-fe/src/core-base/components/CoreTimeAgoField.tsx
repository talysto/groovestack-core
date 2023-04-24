import React from 'react'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

import { useRecordContext } from 'react-admin'

export const timeAgo = (timestamp: string) => {
  if (!timestamp) return null

  const m = dayjs(timestamp)
  return (
    <span title={m.format('dddd, MMMM Do YYYY, h:mm a')}>{m.fromNow()}</span>
  )
}

export const CoreTimeAgoField: React.FC<{ label?: string; source: string }> = ({
  source,
}) => {
  const record = useRecordContext()

  if (!record) return null

  return timeAgo(record[source])
}
