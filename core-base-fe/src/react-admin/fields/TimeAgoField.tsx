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

export const TimeAgoField = ({ label, source }:{ label?: string; source: string }) => {
  const record = useRecordContext()

  if (!record) return null

  return timeAgo(record[source])
}
